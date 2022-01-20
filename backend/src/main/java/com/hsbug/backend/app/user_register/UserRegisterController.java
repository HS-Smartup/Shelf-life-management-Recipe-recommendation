package com.hsbug.backend.app.user_register;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
/*

    로그인, 회원 가입, id/pw 찾기, 회원 탈퇴

*/
@RestController
@RequestMapping("/api")        // 기본 url /api/...
public class UserRegisterController {

    private final UserRegisterService userRegisterService;

    public UserRegisterController(UserRegisterService userRegisterService) {
        this.userRegisterService = userRegisterService;
    }

    @GetMapping("/loginsuccess")     // 로그인 성공시 get
    public String LoginsuccessPage() {
        return "login success";
    }

    @GetMapping("/signup")     // 회원가입 페이지 Controller
    public String SignupPage(){//@RequestBody AccountForm accountForm, HttpSession session) {
        return "Sign up page";
    }

    @PostMapping("/signup")     // 회원가입 post
    public UserRegisterDto CreateUser(@RequestBody UserRegisterDto userRegisterDto) throws Exception {
        if userRegisterService.loadUserByUsername(userRegisterDto.getUsername())

        userRegisterService.save(userRegisterDto);           // service에 dto 저장
        System.out.println(userRegisterDto.getUsername());
        System.out.println(userRegisterDto.getPassword());
        return userRegisterDto;
        }
    }

