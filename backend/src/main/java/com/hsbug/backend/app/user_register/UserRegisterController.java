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

    @GetMapping("/login")     // 로그인 페이지 Controller
    public String LoginPage() {
        return "account/login";
    }

    @GetMapping("/signup")     // 회원가입 페이지 Controller
    public List<UserRegisterEntity> SignupPage(){//@RequestBody AccountForm accountForm, HttpSession session) {
        List<UserRegisterDto> acc = new ArrayList<UserRegisterDto>();
        List<UserRegisterEntity> acc2 = new ArrayList<UserRegisterEntity>();
        UserRegisterDto account = UserRegisterDto.builder()
                .username("임현준")
                .password("123")
                .build();
        acc.add(account);
        userRegisterService.save(account);
        acc2.add(userRegisterService.loadUserByUsername("임현준"));
        return acc2;
    }

    @PostMapping("/signup")
    public UserRegisterDto createUser(@RequestBody UserRegisterDto accountForm) throws Exception {
        //System.out.println(accountForm.getUsername());
        return accountForm;

        }
    }

