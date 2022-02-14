package com.hsbug.backend.app.manage_user_info.delete_user;
import com.hsbug.backend.app.user_register.UserRegisterDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class DeleteUserController {     // 회원 탈퇴

    private final DeleteUserService deleteUserService;

    @PostMapping("/deleteUser/delete")
    public JSONObject DeleteUser() {
        JSONObject obj = deleteUserService.deleteUser();
        obj.put("status",200);
        return obj;
    }

}
