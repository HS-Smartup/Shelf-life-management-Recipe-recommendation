package com.hsbug.backend.app.user_register.external_login;

import com.hsbug.backend.app.Config.Jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class OAuth2Controller {
    private final JwtTokenProvider jwtTokenProvider;

    private CustomOAuth2UserService customOAuth2UserService;

    @GetMapping({"", "/"})
    public String getAuthorizationMessage() {
        List<String> role = new ArrayList<>();
        role.add("ROLE_USER");

        System.out.println(jwtTokenProvider.createToken("immenige2@gmail.com",role));
        return "redirect:/home";
    }


}
