package com.hsbug.backend.app.user_register;

import com.hsbug.backend.app.Config.Jwt.JwtTokenProvider;
import org.json.simple.JSONObject;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/*

    로그인, 회원 가입, id/pw 찾기, 회원 탈퇴

*/
@RestController
@RequestMapping("/api")        // 기본 url /api/...
public class UserRegisterController {

    private final UserRegisterService userRegisterService;
    private final HttpSession  httpSession;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public UserRegisterController(UserRegisterService userRegisterService, HttpSession httpSession, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRegisterService = userRegisterService;
        this.httpSession = httpSession;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping({"/loginSuccess", "/hello"})     // 로그인 성공시 get
    public UserRegisterDto LoginsuccessPage(UserRegisterDto form) {
        //UserRegisterDto form ;
        form.setEmail(httpSession.getAttribute("username").toString());
        form.setPassword("secret");
        return form;
    }

    @GetMapping("loginFailure")
    public String LoginfailurePage(){
        return "로그인 실패";
    }

    @GetMapping("/signup")     // 회원가입 페이지 Controller
    public String SignupPage(){//@RequestBody AccountForm accountForm, HttpSession session) {
        return "Sign up page";
    }

    @PostMapping("/signup")     // 회원가입 post
    public JSONObject CreateUser(@RequestBody UserRegisterDto userRegisterDto) {
        JSONObject obj = new JSONObject();
        if (!userRegisterService.checkUserByUsername(userRegisterDto.getEmail())){
            System.out.println("이미 등록된 회원입니다.");
            obj.put("message","이미 등록된 회원입니다.");
        }
        else {
            userRegisterDto.setRoles("ROLE_USER");
            userRegisterService.save(userRegisterDto);           // service에 dto 저장
            System.out.println(userRegisterDto.getEmail());
            System.out.println(userRegisterDto.getPassword());
            System.out.println(userRegisterDto.getRoles());
            obj.put("message","회원 가입 성공");
        }
        return obj;
    }

    @PostMapping("/login")
    public JSONObject login(@RequestBody Map<String, String> user){
        List<String> role = new ArrayList<>();
        role.add("ROLE_USER");
        JSONObject obj = new JSONObject();

        if (userRegisterService.checkUserByUsername(user.get("email"))){
            obj.put("message", "잘못된 아이디입니다.");
        }
        else {
            UserRegisterEntity member = userRegisterService.loadUserByUsername(user.get("email"));

            if (!passwordEncoder.matches(user.get("password"), member.getPassword())) {
                obj.put("message", "잘못된 비밀번호입니다.");
            }
            else {
                obj.put("message", "로그인 성공");
                obj.put("token", jwtTokenProvider.createToken(member.getUsername(), role));
            }
        }
        return obj;

    }
}

