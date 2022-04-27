package com.hsbug.backend.admin_page.Home;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeRepository;
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
    private final ManageRecipeRepository manageRecipeRepository;

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
    @Transactional
    public List<UserRegisterDto> getUserAll(){
        List<UserRegisterEntity> userRegisterEntities = userRegisterRepository.findAllByRoles("[ROLE_USER]");
        List<UserRegisterDto> userRegisterDtoList = new ArrayList<>();
        if(userRegisterEntities.isEmpty()) return userRegisterDtoList;
        for (UserRegisterEntity userRegisterEntity : userRegisterEntities){
            userRegisterDtoList.add(this.converEntityTODto(userRegisterEntity));
        }
        return userRegisterDtoList;

    }
    // ~~~
    private ManageRecipeDto converEntityTODto(ManageRecipeEntity manageRecipeEntity){
        return ManageRecipeDto.builder()
                .RCP_ID(manageRecipeEntity.getId())
                .RCP_NM(manageRecipeEntity.getRCP_NM())
                .build();
    }
    public List<ManageRecipeDto> getRecipeAll(){
        List<ManageRecipeEntity> manageRecipeEntities = manageRecipeRepository.findAllByRCP_NM();
        List<ManageRecipeDto> manageRecipeDtoList = new ArrayList<>();
        if(manageRecipeEntities.isEmpty()) return manageRecipeDtoList;
        for (ManageRecipeEntity manageRecipeEntity : manageRecipeEntities){
            manageRecipeDtoList.add(this.converEntityTODto(manageRecipeEntity));
        }
        return manageRecipeDtoList;
    }

}

