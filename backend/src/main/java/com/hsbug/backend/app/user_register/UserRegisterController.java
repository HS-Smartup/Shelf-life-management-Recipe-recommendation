package com.hsbug.backend.app.user_register;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api")
public class UserRegisterController {

    private final UserRegisterService userRegisterService;
    private final UserRegisterRepository userRegisterRepository;

    public UserRegisterController(UserRegisterService userRegisterService, UserRegisterRepository userRegisterRepository) {
        this.userRegisterService = userRegisterService;
        this.userRegisterRepository = userRegisterRepository;
    }

    @GetMapping("/loginsuccess")     // 로그인 페이지 Controller
    public String LoginsuccessPage() {
        return "login success";
    }

    @GetMapping("/signup")     // 회원가입 페이지 Controller
    public String SignupPage(){//@RequestBody AccountForm accountForm, HttpSession session) {
        return "Sign up page";
    }

    @PostMapping("/signup")
    public UserRegisterDto createUser(@RequestBody UserRegisterDto accountForm) throws Exception {
        //System.out.println(accountForm.getUsername());
        userRegisterService.save(accountForm);
        System.out.println(accountForm.getUsername());
        System.out.println(accountForm.getPassword());
        return accountForm;
        }
    }

