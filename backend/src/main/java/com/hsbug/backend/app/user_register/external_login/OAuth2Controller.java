package com.hsbug.backend.app.user_register.external_login;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OAuth2Controller {

    private CustomOAuth2UserService customOAuth2UserService;

    @GetMapping({"", "/"})
    public String getAuthorizationMessage() {
        return "redirect:/home";
    }


}
