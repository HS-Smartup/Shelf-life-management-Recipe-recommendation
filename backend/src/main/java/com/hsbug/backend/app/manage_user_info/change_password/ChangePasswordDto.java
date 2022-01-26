package com.hsbug.backend.app.manage_user_info.change_password;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ChangePasswordDto {

    private Long id;
    private String username;
    private String email;
    private String password;
}
