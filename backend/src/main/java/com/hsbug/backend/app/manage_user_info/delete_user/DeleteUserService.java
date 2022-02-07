package com.hsbug.backend.app.manage_user_info.delete_user;

import com.hsbug.backend.app.user_register.UserRegisterEntity;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeleteUserService {

    private final DeleteUserRepository deleteUserRepository;

    private String findEmail() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return email;
    }

    @Transactional
    public JSONObject deleteUser() throws NullPointerException {       //회원 탈퇴
        JSONObject obj = new JSONObject();
        try {
            String email = findEmail();
            deleteUserRepository.deleteByEmail(email);

            obj.put("message","delete success : " + email);
            return obj;
        }catch(Exception e){
            obj.put("message","delete fail");
            return obj;
        }
    }

}
