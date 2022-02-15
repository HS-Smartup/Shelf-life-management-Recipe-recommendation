package com.hsbug.backend.app.manage_user_info.change_password;

import com.hsbug.backend.app.user_register.UserRegisterDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class ChangePasswordController {

    private final ChangePasswordService changePasswordService;

    @PostMapping("/changepwd") // 로그인 시, 또는 비밀번호 인증 시 넘어갈 수 있도록 설정해야함.
    public JSONObject ChangeUser(@RequestBody UserRegisterDto userRegisterDto){
        JSONObject obj = new JSONObject();
        //String password = userRegisterDto.
        changePasswordService.changepassword(userRegisterDto.getEmail(),userRegisterDto.getPassword());
        obj.put("message","변경 성공");
        obj.put("status",200);
        obj.put("password",userRegisterDto.getPassword());
        return obj;
    }
}
