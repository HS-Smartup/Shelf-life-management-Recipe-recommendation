package com.hsbug.backend.app.user_register.external_login;

import com.hsbug.backend.app.Config.Jwt.JwtTokenProvider;
import com.hsbug.backend.app.user_register.UserRegisterDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
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

    @GetMapping({"/", "/"})
    public void getAuthorizationMessage(HttpServletResponse response) throws IOException {
        String token = getToken("123@naver.com");
        //return response;
    }

    @PostMapping("/api/signin/naver")
    public JSONObject naverLogin(@RequestBody JSONObject object){
        JSONObject naver_obj = new JSONObject();

        String naver_sub = (String) object.get("id");
        String email = (String)object.get("email");
        String name = (String)object.get("name");
        String picture = (String)object.get("picture");

        UserRegisterDto userRegisterDto = new UserRegisterDto();
        userRegisterDto.naverDtoOption(email, name, naver_sub, picture);
        customOAuth2UserService.saveOrUpdate(userRegisterDto);
        naver_obj.put("token",getToken(userRegisterDto.getNaver_sub()));
        naver_obj.put("email",email);
        naver_obj.put("status",200);
        return naver_obj;
    }

    @PostMapping("/api/signin/google")
    public JSONObject googleLogin(@RequestBody JSONObject object){
        JSONObject google_obj = new JSONObject();

        String google_sub = (String) object.get("sub");
        String email = (String)object.get("email");
        String name = (String)object.get("name");
        String picture = (String)object.get("picture");

        UserRegisterDto userRegisterDto = new UserRegisterDto();
        userRegisterDto.naverDtoOption(email, name, google_sub, picture);
        customOAuth2UserService.saveOrUpdate(userRegisterDto);
        google_obj.put("token",getToken(userRegisterDto.getGoogle_sub()));
        google_obj.put("email",email);
        google_obj.put("status",200);
        return google_obj;
    }

    @PostMapping("/api/signin/kakao")
    public JSONObject kakaoLogin(@RequestBody JSONObject object){
        JSONObject kakao_obj = new JSONObject();

        String kakao_sub = (String) object.get("id");
        String email = (String)object.get("email");
        String name = (String)object.get("nickname");
        String picture = (String)object.get("profile_image");

        UserRegisterDto userRegisterDto = new UserRegisterDto();
        userRegisterDto.naverDtoOption(email, name, kakao_sub, picture);
        customOAuth2UserService.saveOrUpdate(userRegisterDto);
        kakao_obj.put("token",getToken(userRegisterDto.getKakao_sub()));
        kakao_obj.put("email",email);
        kakao_obj.put("status",200);
        return kakao_obj;
    }

    private String getToken(String token){
        List<String> role = new ArrayList<>();
        role.add("ROLE_USER");
        return jwtTokenProvider.createToken(token,role);
    }
}
