package com.hsbug.backend.admin_page.admin_register;

import com.hsbug.backend.app.user_register.UserRegisterDto;
import com.hsbug.backend.app.user_register.UserRegisterService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class AdminRegisterController {
    private final UserRegisterService userRegisterService;
    JSONObject obj = new JSONObject();


    @PostMapping("/api/login")
    public String log(@RequestBody Map<String, String> admin){
        if (userRegisterService.checkUserByUsername(admin.get("email"))){
            obj.put("message", "잘못된 아이디입니다.");
        } else{

        }
        return "post/login";
    }

    @PostMapping("/admin/register")
    public String register(@RequestBody UserRegisterDto userRegisterDto){
        JSONObject obj = new JSONObject();
        if (!userRegisterService.checkUserByUsername(userRegisterDto.getEmail())){
            System.out.println("이미 등록된 관리자입니다.");
            obj.put("message","이미 등록된 관리자입니다.");
        }else{
            List<String> role = new ArrayList<>();
            role.add("ROLE_ADMIN");
            userRegisterDto.setRoles(String.valueOf(role));
            userRegisterService.save(userRegisterDto);
            obj.put("message","관리자 등록 완료");
            obj.put("status",200);
        }
        System.out.println(obj);
        return "Home";
    }


}
