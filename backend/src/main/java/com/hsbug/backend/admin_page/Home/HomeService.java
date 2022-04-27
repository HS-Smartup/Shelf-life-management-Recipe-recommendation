package com.hsbug.backend.admin_page.Home;

import com.hsbug.backend.app.user_register.UserRegisterDto;
import com.hsbug.backend.app.user_register.UserRegisterEntity;
import com.hsbug.backend.app.user_register.UserRegisterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

//관리자 페이지 서비스
@Service
@RequiredArgsConstructor
public class HomeService {
    private final UserRegisterRepository userRegisterRepository;

    private UserRegisterDto converEntityTODto(UserRegisterEntity userRegisterEntity){
        return UserRegisterDto.builder()
                .id(userRegisterEntity.getId())
                .email(userRegisterEntity.getEmail())
                .roles(userRegisterEntity.getRoles())
                .build();
    }

    @Transactional
    public List<UserRegisterDto> getAdminAll(){
        List<UserRegisterEntity> userRegisterEntities = userRegisterRepository.findAllByRoles("[ROLE_ADMIN]");
        List<UserRegisterDto> userRegisterDtoList = new ArrayList<>();
        if(userRegisterEntities.isEmpty()) return userRegisterDtoList;
        for (UserRegisterEntity userRegisterEntity : userRegisterEntities){
            userRegisterDtoList.add(this.converEntityTODto(userRegisterEntity));
        }
        return userRegisterDtoList;

    }
}

