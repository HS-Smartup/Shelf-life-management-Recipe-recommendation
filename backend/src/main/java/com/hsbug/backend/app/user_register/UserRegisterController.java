package com.hsbug.backend.app.user_register;

import org.springframework.web.bind.annotation.*;

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

    @GetMapping("loginfailure")
    public String LoginfailurePage(){
        return "로그인 실패";
    }

    @GetMapping("/signup")     // 회원가입 페이지 Controller
    public String SignupPage(){//@RequestBody AccountForm accountForm, HttpSession session) {
        return "Sign up page";
    }

    @PostMapping("/signup")     // 회원가입 post
    public String CreateUser(@RequestBody UserRegisterDto userRegisterDto) {
        if (!userRegisterService.checkUserByUsername(userRegisterDto.getUsername())){
            System.out.println("이미 등록된 회원입니다.");
            return "회원가입 실패, 이미 등록된 회원입니다.";
        }
        else {
            userRegisterService.save(userRegisterDto);           // service에 dto 저장
            System.out.println(userRegisterDto.getUsername());
            System.out.println(userRegisterDto.getPassword());
            return "회원가입 성공";
        }
    }
}

