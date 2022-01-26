package com.hsbug.backend.app.manage_user_info.delete_user;
import com.hsbug.backend.app.user_register.UserRegisterDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DeleteUserController {     // 회원 탈퇴

    private final DeleteUserService deleteUserService;

    public DeleteUserController(DeleteUserService deleteUserService) {
        this.deleteUserService = deleteUserService;
    }

    @PostMapping("/deleteUser")
    public String DeleteUser(@RequestBody UserRegisterDto userRegisterDto) {

        String username = userRegisterDto.getEmail();
        System.out.println(username);
        deleteUserService.deleteUser(username);
        return "delete user"+username;
    }

}
