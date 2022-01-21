package com.hsbug.backend.app.user_register.external_login;

import com.hsbug.backend.app.Config.Jwt.JwtTokenProvider;
import com.hsbug.backend.app.user_register.UserRegisterEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class OAuth2Controller {
    private final JwtTokenProvider jwtTokenProvider;

    private CustomOAuth2UserService customOAuth2UserService;

    public OAuth2Controller(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping({"", "/"})
    public String getAuthorizationMessage(Model model) {
        List<String> role = new ArrayList<>();
        role.add("ROLE_USER");

        //String a = model.getAttribute("user").toString();
        System.out.println(jwtTokenProvider.createToken("임혅누",role));
        return "redirect:/home";
    }


}
