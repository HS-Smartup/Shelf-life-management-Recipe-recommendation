package com.hsbug.backend.app.user_register;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
@NoArgsConstructor
@Setter @Getter
public class UserRegisterDto {

    private Long id;
    private String email;
    private String password;
    private String roles;

    @Builder
    public UserRegisterDto(Long id, String email, String password, String roles, String credit_check){
        this.id = id;
        this.email = email;
        this.password = "{bcrypt}"+password;
        this.roles = "ROLE_USER";
    }

    public UserRegisterEntity toEntity(){
        return UserRegisterEntity.builder()
                .id(id)
                .username(email)
                .password(password)     // BCryptPasswordEncoder  == 스프링 시큐리티에서 제공, 비밀번호 암호화
                .roles(roles)
                .build();
    }

}
