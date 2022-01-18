package com.hsbug.backend.app.user_register;

import lombok.*;

@Data
@NoArgsConstructor
@Setter @Getter
public class UserRegisterDto {

    private Long id;
    private String username;
    private String password;


    @Builder
    public UserRegisterDto(Long id, String username, String password, String role, String credit_check){
        this.id = id;
        this.username = username;
        this.password = "{bcrypt}"+password;
    }

    public UserRegisterEntity toEntity(){
        return UserRegisterEntity.builder()
                .id(id)
                .username(username)
                .password(password)     // BCryptPasswordEncoder  == 스프링 시큐리티에서 제공, 비밀번호 암호화
                .build();
    }

}
