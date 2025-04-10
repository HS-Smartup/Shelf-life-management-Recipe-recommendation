package com.hsbug.backend.app.user_register.external_login;


import com.hsbug.backend.app.user_register.UserRegisterDto;
import com.hsbug.backend.app.user_register.UserRegisterEntity;
import com.hsbug.backend.app.user_register.UserRegisterRepository;
import com.hsbug.backend.app.user_register.UserRegisterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.http.OAuth2ErrorResponseErrorHandler;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequestEntityConverter;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthorizationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

@Service
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRegisterDto userRegisterDto;     //호배
    private final UserRegisterService userRegisterService;      //호배
    private final UserRegisterRepository userRegisterRepository;
    private RestOperations restOperations;

    private static final String MISSING_USER_INFO_URI_ERROR_CODE = "missing_user_info_uri";

    private static final String MISSING_USER_NAME_ATTRIBUTE_ERROR_CODE = "missing_user_name_attribute";

    private static final String INVALID_USER_INFO_RESPONSE_ERROR_CODE = "invalid_user_info_response";

    private static final ParameterizedTypeReference<Map<String, Object>> PARAMETERIZED_RESPONSE_TYPE =
            new ParameterizedTypeReference<Map<String, Object>>() {};

    private Converter<OAuth2UserRequest, RequestEntity<?>> requestEntityConverter = new OAuth2UserRequestEntityConverter();

    public CustomOAuth2UserService(UserRegisterDto userRegisterDto, UserRegisterService userRegisterService, UserRegisterRepository userRegisterRepository) {
        this.userRegisterDto = userRegisterDto;
        this.userRegisterService = userRegisterService;
        this.userRegisterRepository = userRegisterRepository;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setErrorHandler(new OAuth2ErrorResponseErrorHandler());
        this.restOperations = restTemplate;

    }


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        Assert.notNull(userRequest, "userRequest cannot be null");
        if (!StringUtils.hasText(userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUri())) {
            OAuth2Error oauth2Error = new OAuth2Error(
                    MISSING_USER_INFO_URI_ERROR_CODE,
                    "Missing required UserInfo Uri in UserInfoEndpoint for Client Registration: " +
                            userRequest.getClientRegistration().getRegistrationId(),
                    null
            );
            throw new OAuth2AuthenticationException(oauth2Error, oauth2Error.toString());
        }

        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        // UserName Error 거르는 조건문
        if (!StringUtils.hasText(userNameAttributeName)) {
            OAuth2Error oauth2Error = new OAuth2Error(
                    MISSING_USER_NAME_ATTRIBUTE_ERROR_CODE,
                    "Missing required \"user name\" attribute name in UserInfoEndpoint for Client Registration: " +
                            userRequest.getClientRegistration().getRegistrationId(),
                    null
            );
            throw new OAuth2AuthenticationException(oauth2Error, oauth2Error.toString());
        }

        //request 컬렉션에 저장
        RequestEntity<?> request = this.requestEntityConverter.convert(userRequest);
        //response 저장할 객체 선언
        ResponseEntity<Map<String, Object>> response;

        try {
            response = this.restOperations.exchange(request, PARAMETERIZED_RESPONSE_TYPE);
        } catch (OAuth2AuthorizationException ex) {
            OAuth2Error oauth2Error = ex.getError();
            StringBuilder errorDetails = new StringBuilder();
            errorDetails.append("Error details: [");
            errorDetails.append("UserInfo Uri: ").append(
                    userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUri());
            errorDetails.append(", Error Code: ").append(oauth2Error.getErrorCode());
            if (oauth2Error.getDescription() != null) {
                errorDetails.append(", Error Description: ").append(oauth2Error.getDescription());
            }
            errorDetails.append("]");
            oauth2Error = new OAuth2Error(INVALID_USER_INFO_RESPONSE_ERROR_CODE,
                    "An error occurred while attempting to retrieve the UserInfo Resource: " + errorDetails.toString(), null);
            throw new OAuth2AuthenticationException(oauth2Error, oauth2Error.toString(), ex);
        } catch (RestClientException ex) {
            OAuth2Error oauth2Error = new OAuth2Error(INVALID_USER_INFO_RESPONSE_ERROR_CODE,
                    "An error occurred while attempting to retrieve the UserInfo Resource: " + ex.getMessage(), null);
            throw new OAuth2AuthenticationException(oauth2Error, oauth2Error.toString(), ex);
        }

        Map<String, Object> userAttributes = getUserAttributes(response);
        Set<GrantedAuthority> authorities = new LinkedHashSet<>();
        authorities.add(new OAuth2UserAuthority(userAttributes));
        OAuth2AccessToken token = userRequest.getAccessToken();
        for (String authority : token.getScopes()) {
            authorities.add(new SimpleGrantedAuthority("SCOPE_" + authority));
        }

        log.info("userAttribute = {}",userAttributes);


        userRegisterDto.clear();
        if (userNameAttributeName =="sub"){  // 구글
            String google_sub = String.valueOf(userAttributes.get("sub"));
            String email = String.valueOf(userAttributes.get("email"));
            String name = String.valueOf(userAttributes.get("name"));
            String picture = String.valueOf(userAttributes.get("picture"));
            userRegisterDto.googleDtoOption(email, name, google_sub, picture);


        }
        if(userNameAttributeName =="id"){  // 카카오 네이버는 id가 같아서 내부 요소로 확인
            if (userAttributes.containsKey("resultcode")){ // 네이버
                String naver_sub = String.valueOf(userAttributes.get("id"));
                String email = String.valueOf(userAttributes.get("email"));
                String name = String.valueOf(userAttributes.get("name"));
                String picture = String.valueOf(userAttributes.get("picture"));

                userRegisterDto.naverDtoOption(email, name, naver_sub, picture);
            }
            else { //카카오 닉네임은 userAttributes 안의 properties에, 카카오 닉네임은 userAttribues 안의 profile에 위치
                String kakao_sub = String.valueOf(userAttributes.get("id"));
                Map<String,String> properties = (Map<String, String>) userAttributes.get("properties");
                Map<String,String> profile = (Map<String, String>) userAttributes.get("kakao_account");

                System.out.println(properties.get("nickname"));
                System.out.println(profile.get("email"));
                System.out.println(userAttributes.get("email"));

                String email = String.valueOf(profile.get("email"));
                String name = String.valueOf(properties.get("nickname"));
                String picture = String.valueOf(properties.get("profile_image"));
                userRegisterDto.kakaoDtoOption(email, name, kakao_sub, picture);
            }
        }
        // 저장, 혹은 존재 시 업데이트
        saveOrUpdate(userRegisterDto);

        return new DefaultOAuth2User(authorities, userAttributes, userNameAttributeName);
    }

    // 네이버는 HTTP response body에 response 안에 id 값을 포함한 유저정보를 넣어주므로 유저정보를 빼내기 위한 작업을 함
    private Map<String, Object> getUserAttributes(ResponseEntity<Map<String, Object>> response) {
        Map<String, Object> userAttributes = response.getBody();
        if(userAttributes.containsKey("response")) {
            LinkedHashMap responseData = (LinkedHashMap)userAttributes.get("response");
            userAttributes.putAll(responseData);
            userAttributes.remove("response");
        }
        return userAttributes;
    }

    void saveOrUpdate(UserRegisterDto userRegisterDto){
        String login_con = userRegisterDto.getLogin_cont();
        boolean user_check = true;
        System.out.println(userRegisterDto.getLogin_cont());
        if (login_con =="naver"){
            user_check = userRegisterService.checkUserByNaversub(userRegisterDto.getNaver_sub());
            if(!user_check){
                UserRegisterEntity user = userRegisterService.loadUserByNaversub(userRegisterDto.getNaver_sub());
                userRegisterRepository.save(user);
            }else{
                userRegisterService.save(userRegisterDto);
            }
        }
        else if (login_con == "google"){
            user_check = userRegisterService.checkUserByGooglesub(userRegisterDto.getGoogle_sub());
            if(!user_check){
                UserRegisterEntity user = userRegisterService.loadUserByGooglesub(userRegisterDto.getGoogle_sub());
                userRegisterRepository.save(user);
            }else{
                userRegisterService.save(userRegisterDto);
            }
        }
        else if (login_con == "kakao"){
            user_check = userRegisterService.checkUserByKakaosub(userRegisterDto.getKakao_sub());
            if(!user_check){
                UserRegisterEntity user = userRegisterService.loadUserByKakaosub(userRegisterDto.getKakao_sub());
                userRegisterRepository.save(user);
            }else{
                userRegisterService.save(userRegisterDto);
            }
        }
        else{
            System.out.println("문제 발생");
        }
        //user_check = userRegisterService.checkUserByUsername(userRegisterDto.getEmail());
        //System.out.println(user_check);
        //if (!user_check){ // update
        //    UserRegisterEntity user = userRegisterService.loadUserByUsername(userRegisterDto.getEmail());
        //    userRegisterRepository.save(user);
        //}else{ //save
        //    userRegisterService.save(userRegisterDto);
        //}
    }

}



