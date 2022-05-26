package com.hsbug.backend.app.user_register.external_login;

import com.hsbug.backend.app.Config.Jwt.JwtTokenProvider;
import com.hsbug.backend.app.user_register.UserRegisterDto;
import com.hsbug.backend.app.user_register.UserRegisterService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class OAuth2Controller {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final UserRegisterService userRegisterService;
    public List<String> setRole(){
        List<String> role = new ArrayList<>();
        role.add("ROLE_USER");
        return role;
    }

    @PostMapping("/api/signin/naver")
    public JSONObject naverLogin(@RequestBody JSONObject object) throws ParseException {
        JSONObject naver_obj = new JSONObject();
        JSONParser parser = new JSONParser();
        JSONObject naver_parse = (JSONObject) parser.parse(String.valueOf(object));
        JSONObject naver_profile = (JSONObject) naver_parse.get("response");
        System.out.println(naver_profile);

        String naver_sub = (String) naver_profile.get("id");
        String email = (String) naver_profile.get("email");
        String username = (String) naver_profile.get("name");
        String picture = (String) object.get("picture");

        System.out.println(SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());

        UserRegisterDto userRegisterDto = new UserRegisterDto();
        userRegisterDto.naverDtoOption(email, username, naver_sub, picture);
        userRegisterDto.setLogin_cont("naver");
        userRegisterDto.setEmail(email);
        userRegisterDto.setRoles("ROLE_USER");

        customOAuth2UserService.saveOrUpdate(userRegisterDto);
        username = userRegisterService.loadUserByNaversub(naver_sub).getUsername();

        naver_obj.put("token",getToken(userRegisterDto.getNaver_sub()));
        naver_obj.put("email",email);
        naver_obj.put("status",200);
        naver_obj.put("username",username);
        System.out.println(naver_obj);
        return naver_obj;
    }

    @PostMapping("/api/signin/google")
    public JSONObject googleLogin(@RequestBody JSONObject object) throws ParseException {
        JSONObject google_obj = new JSONObject();
        JSONParser parser = new JSONParser();
        System.out.println(object);
        JSONObject google_parse = (JSONObject) parser.parse(String.valueOf(object));
        JSONObject googleProfileResult = (JSONObject) google_parse.get("googleProfileResult");
        JSONObject google_profile = (JSONObject) googleProfileResult.get("user");
        JSONObject google_token = (JSONObject) google_parse.get("accessToken");

        System.out.println(google_profile);

        String google_sub = (String) google_profile.get("id");
        //String google_sub = (String) google_token.get("accessToken");
        String email = (String) google_profile.get("email");
        String username = (String) google_profile.get("name");
        String picture = (String) google_profile.get("picture");

        UserRegisterDto userRegisterDto = new UserRegisterDto();
        userRegisterDto.googleDtoOption(email, username, google_sub, picture);
        userRegisterDto.setLogin_cont("google");
        userRegisterDto.setRoles("ROLE_USER");
        userRegisterDto.setEmail(email);


        customOAuth2UserService.saveOrUpdate(userRegisterDto);
        username = userRegisterService.loadUserByGooglesub(google_sub).getUsername();


        google_obj.put("token",getToken(userRegisterDto.getGoogle_sub()));
        google_obj.put("email",email);
        google_obj.put("status",200);
        google_obj.put("username",username);

        return google_obj;
    }

    @PostMapping("/api/signin/kakao")
    public JSONObject kakaoLogin(@RequestBody JSONObject object) throws ParseException {
        JSONObject kakao_obj = new JSONObject();
        JSONParser parser = new JSONParser();
        JSONObject kakao_parse = (JSONObject) parser.parse(String.valueOf(object));

        JSONObject kakao_profile = (JSONObject) kakao_parse.get("kakaoProfileResult");
        JSONObject kakao_token = (JSONObject) kakao_parse.get("accessToken");

        System.out.println(kakao_token);
        System.out.println(kakao_profile);

        //String kakao_sub = (String) kakao_token.get("accessToken");
        String kakao_sub = (String) kakao_profile.get("id");
        String email = (String) kakao_profile.get("email");
        String username = (String) kakao_profile.get("nickname");
        String picture = (String) kakao_profile.get("profileImageUrl");

        UserRegisterDto userRegisterDto = new UserRegisterDto();
        userRegisterDto.kakaoDtoOption(email, username, kakao_sub, picture);
        userRegisterDto.setLogin_cont("kakao");
        userRegisterDto.setRoles("ROLE_USER");
        userRegisterDto.setEmail(email);

        customOAuth2UserService.saveOrUpdate(userRegisterDto);
        username = userRegisterService.loadUserByKakaosub(kakao_sub).getUsername();


        kakao_obj.put("token",getToken(userRegisterDto.getKakao_sub()));
        kakao_obj.put("email",email);
        kakao_obj.put("status",200);
        kakao_obj.put("username",username);

        return kakao_obj;
    }

    private String getToken(String token){
//        List<String> role = new ArrayList<>();
//        role.add("ROLE_USER");
        String role = "ROLE_USER";
        return jwtTokenProvider.createToken(token,role);
    }
}
