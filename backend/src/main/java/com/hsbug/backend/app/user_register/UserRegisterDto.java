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

    private Long id;        //id? 필요?
    private String email;
    private String name;
    private String password;
    private String roles;
    private String goofleSub; //구글 서브 용
    private String photo;     //프로필 사진 받는용

    @Builder
    public UserRegisterDto(Long id, String email, String name, String password, String roles, String goofleSub, String photo, String credit_check){
        this.id = id;
        this.email = email;
        this.password = "{bcrypt}"+password;
        this.roles = "ROLE_USER";

        this.name = name;
        this.goofleSub = goofleSub;
        this.photo = photo;
    }

    /**
     * 구글 회원에게서 가져오는 폼중에서 필요한것만 따로 떨굼   (빌더회피를 위함)
     * @param email
     * @param name
     * @param goofleSub
     * @param photo
     * password값을 입력하지 않으면 저장시 오류가 나는 경우가 있어서 google입력은 google이라는 값으로 통일했다.
     */
    public void googleDtoOption(String email, String name, String goofleSub, String photo) {
        this.email = email;
        this.name = name;
        this.goofleSub = goofleSub;
        this.photo = photo;
        this.password = "google";
    }



    public UserRegisterEntity toEntity(){
        return UserRegisterEntity.builder()

                .username(name)
                .email(email)
                .password(password)     // BCryptPasswordEncoder  == 스프링 시큐리티에서 제공, 비밀번호 암호화
                .roles(roles)
                .goofleSub(goofleSub)
                .photo(photo)
                .build();
    }

}
