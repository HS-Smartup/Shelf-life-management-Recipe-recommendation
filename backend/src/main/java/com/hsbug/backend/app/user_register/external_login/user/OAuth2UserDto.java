package com.hsbug.backend.app.user_register.external_login.user;

import lombok.Getter;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import com.hsbug.backend.app.user_register.UserRegisterEntity;

import java.io.Serializable;

@Getter
public class OAuth2UserDto implements Serializable {

    private String name;
    private String email;
    private String picture;

    public OAuth2UserDto(OAuth2UserEntity oAuth2UserEntity){
        this.name = oAuth2UserEntity.getName();
        this.email = oAuth2UserEntity.getEmail();
        this.picture = oAuth2UserEntity.getPicture();
    }


}
