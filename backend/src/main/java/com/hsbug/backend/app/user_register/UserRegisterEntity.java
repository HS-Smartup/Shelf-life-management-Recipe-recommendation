package com.hsbug.backend.app.user_register;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserRegisterEntity implements UserDetails {
    @Id @Column(name = "user_id")       // SQL에서 자동 생성되도록 돕는 어노테이션
    @GeneratedValue(strategy = GenerationType.IDENTITY)         // 자동 생성 (프라이머리 키 자동 증가)
    private Long id;

    private String username;
    private String password;
    private String roles;

    private String email;
    private String goofleSub;
    private String photo;

    @Builder
    public UserRegisterEntity(Long id, String email, String username, String password, String roles, String credit_check, String goofleSub, String photo){
//        this.id = id; 아이디값을 줘야하나??

        this.username = username;
        this.email = email;
        this.password = "{bcrypt}"+password;
        this.roles = roles;
        this.goofleSub = goofleSub;
        this.photo = photo;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
