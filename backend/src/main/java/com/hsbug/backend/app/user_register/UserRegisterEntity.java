package com.hsbug.backend.app.user_register;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserRegisterEntity implements UserDetails {
    @Id @Column       // SQL에서 자동 생성되도록 돕는 어노테이션
    @GeneratedValue(strategy = GenerationType.IDENTITY)         // 자동 생성 (프라이머리 키 자동 증가)
    private Long id;

    private String username;
    private String password;
    private String roles;
    private String external_email;
    private String email;
    @Column(name = "Google_sub")
    private String googlesub;
    private String photo;
    @Column(name = "Kakao_sub")
    private String kakaosub;
    @Column(name = "Naver_sub")
    private String naversub;

    @Builder
    public UserRegisterEntity(Long id, String email, String external_email, String username, String password, String roles, String credit_check, String google_sub, String photo, String kakao_sub, String naver_sub){
//        this.id = id; 아이디값을 줘야하나??

        this.username = username;
        this.email = email;
        this.password = "{bcrypt}"+password;
        this.roles = roles;
        this.googlesub = google_sub;
        this.photo = photo;
        this.kakaosub = kakao_sub;
        this.naversub = naver_sub;
        this.external_email = external_email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        String str = getRoles();
        if(str.equals("ROLE_USER")){
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        }
        else if (str.equals("ROLE_ADMIN")){
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        return authorities;
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


