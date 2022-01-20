package com.hsbug.backend.app.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class OAuth2Controller {

    private CustomOAuth2UserService customOAuth2UserService;

    @GetMapping({"", "/"})
    public String getAuthorizationMessage() {
        return "redirect:/home";
    }

    @GetMapping("/login")
    public String login() {
        return "redirect:/login";
    }

    @GetMapping({"/loginSuccess", "/hello"})
    public String loginSuccess() {
        //Map<String,Object> a;
        //a = customOAuth2UserService.loadUser();
        return "redirect:/hello";
    }

    @GetMapping("/loginFailure")
    public String loginFailure() {
        return "redirect:/loginFailure";
    }
}
