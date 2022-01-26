package com.hsbug.backend.app.manage_user_info.change_password;

import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ChangePasswordController {

    private final ChangePasswordService changePasswordService;

    public ChangePasswordController(ChangePasswordService changePasswordService) {
        this.changePasswordService = changePasswordService;
    }

    @PostMapping("/changepwd")
    public JSONObject ChangeUser(@RequestBody ChangePasswordDto changePasswordDto){
        JSONObject obj = new JSONObject();
        //String password = userRegisterDto.
        changePasswordService.changepassword(changePasswordDto.getEmail(),changePasswordDto.getPassword());
        System.out.println("???????????"+changePasswordDto.getPassword());
        obj.put("message","변경 성공");
        obj.put("password",changePasswordDto.getPassword());
        return obj;
    }

}
