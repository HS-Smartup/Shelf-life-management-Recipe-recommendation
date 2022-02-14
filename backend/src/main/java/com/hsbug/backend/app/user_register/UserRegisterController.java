package com.hsbug.backend.app.user_register;

import com.hsbug.backend.app.Config.Jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
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
@RequiredArgsConstructor
public class UserRegisterController {

    private final UserRegisterService userRegisterService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping({"/loginSuccess", "/hello"})     // 로그인 성공시 get
    public JSONObject LoginsuccessPage() {
        JSONObject obj = new JSONObject();
        obj.put("status",200);
        obj.put("user email", SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        return obj;
    }

    @GetMapping("/loginFailure")
    public JSONObject LoginfailurePage(){
        JSONObject obj = new JSONObject();
        obj.put("message","로그인 실패");
        obj.put("status",200);
        return obj;
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
            obj.put("status","???");
            obj.put("message","이미 등록된 회원입니다.");
        }
        else {
            List<String> role = new ArrayList<>();
            role.add("ROLE_USER");
            userRegisterDto.setRoles(String.valueOf(role));
            userRegisterService.save(userRegisterDto);           // service에 dto 저장
            System.out.println(userRegisterDto.getEmail());
            System.out.println(userRegisterDto.getPassword());
            System.out.println(userRegisterDto.getRoles());
            obj.put("message","회원 가입 성공");
            obj.put("status",200);
        }
        return obj;
    }

    @PostMapping("/signin")
    public JSONObject login(@RequestBody Map<String, String> user){
        List<String> role = new ArrayList<>();
        role.add("ROLE_USER");
        JSONObject obj = new JSONObject();

        if (userRegisterService.checkUserByUsername(user.get("email"))){
            obj.put("message", "잘못된 아이디입니다.");
            obj.put("status","???");
        }
        else {
            UserRegisterEntity member = userRegisterService.loadUserByUsername(user.get("email"));

            if (!passwordEncoder.matches(user.get("password"), member.getPassword())) {
                obj.put("message", "잘못된 비밀번호입니다.");
                obj.put("status","???");
            }
            else {
                obj.put("message", "로그인 성공");
                obj.put("status",200);
                obj.put("token", jwtTokenProvider.createToken(user.get("email"), role));
            }
        }
        return obj;

    }
}

