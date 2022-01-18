package com.hsbug.backend.app.user_register;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api")
public class UserController {

    private final AccountService accountService;
    private final AccountRepository accountRepository;

    public UserController(AccountService accountService, AccountRepository accountRepository) {
        this.accountService = accountService;
        this.accountRepository = accountRepository;
    }

    @GetMapping("/login")     // 로그인 페이지 Controller
    public String LoginPage() {
        return "account/login";
    }

    @GetMapping("/signup")     // 회원가입 페이지 Controller
    public List<Account> SignupPage(){//@RequestBody AccountForm accountForm, HttpSession session) {
        List<AccountForm> acc = new ArrayList<AccountForm>();
        List<Account> acc2 = new ArrayList<Account>();
        AccountForm account = AccountForm.builder()
                .username("임현준")
                .password("123")
                .build();
        acc.add(account);
        accountService.save(account);
        acc2.add(accountService.loadUserByUsername("임현준"));
        return acc2;
    }

    @PostMapping("/signup")
    public AccountForm createUser(@RequestBody AccountForm accountForm) throws Exception {
        //System.out.println(accountForm.getUsername());
        return accountForm;

        }
    }

