package com.hsbug.backend.app.user_register;

import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@NoArgsConstructor
@Setter @Getter
public class UserRegisterDto {

    private Long id ;        //id? 필요?
    private String email;
    private String name;
    private String password;
    private String roles;
    private String google_sub; //구글 서브 용
    private String photo;     //프로필 사진 받는용
    private String kakao_sub;
    private String naver_sub;


    @Builder
    public UserRegisterDto(Long id, String email, String name, String password, String roles, String google_sub, String photo, String credit_check
                            , String kakao_sub, String naver_sub){
        this.id = id;
        this.email = email;
        this.password = "{bcrypt}"+password;
        this.roles = roles;

        this.name = name;
        this.google_sub = google_sub;
        this.photo = photo;
        this.kakao_sub = kakao_sub;
        this.naver_sub = naver_sub;
    }

    public UserRegisterDto(UserDetails userDetails) {
    }

    public void googleDtoOption(String email, String name, String google_sub, String photo) {
        this.email = email;
        this.name = name;
        this.google_sub = google_sub;
        this.photo = photo;
        this.password = "password";
    }
    public void kakaoDtoOption(String email, String name, String kakao_sub, String photo) {
        this.email = email;
        this.name = name;
        this.kakao_sub = kakao_sub;
        this.photo = photo;
        this.password = "password";
    }

    public void naverDtoOption(String email, String name, String naver_sub, String photo) {
        this.email = email;
        this.name = name;
        this.naver_sub = naver_sub;
        this.photo = photo;
        this.password = "password";
    }

    public void clear() {
        this.id =null;        //id? 필요?
        this.email =null;
        this.name=null;
        this.password=null;
        this.roles=null;
        this.google_sub=null; //구글 서브 용
        this.photo=null;     //프로필 사진 받는용
        this.kakao_sub=null;
        this.naver_sub=null;
    }

    public UserRegisterEntity toEntity(){
        return UserRegisterEntity.builder()
                .username(name)
                .email(email)
                .password(password)     // BCryptPasswordEncoder  == 스프링 시큐리티에서 제공, 비밀번호 암호화
                .roles(roles)
                .google_sub(google_sub)
                .photo(photo)
                .kakao_sub(kakao_sub)
                .naver_sub(naver_sub)
                .build();
    }

}
