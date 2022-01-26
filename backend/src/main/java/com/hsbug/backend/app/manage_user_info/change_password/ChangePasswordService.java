package com.hsbug.backend.app.manage_user_info.change_password;

import com.hsbug.backend.app.user_register.UserRegisterEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ChangePasswordService {

    private final ChangePasswordRepository changePasswordRepository;      // accountRepository 가져옴

    public ChangePasswordService(ChangePasswordRepository changePasswordRepository) {
        this.changePasswordRepository = changePasswordRepository;
    }

           // 회원 정보 찾기
    public UserRegisterEntity loadUserByUsername(String email) throws UsernameNotFoundException,NullPointerException {
        return changePasswordRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));
    }

    public void changepassword(String email, String password) throws UsernameNotFoundException {     // 비밀번호 변경
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String new_password = encoder.encode(password);
        String new_encoded_password = "{bcrypt}"+new_password;
        UserRegisterEntity account = loadUserByUsername(email);
        account.setPassword(new_encoded_password);

        changePasswordRepository.save(account);
    }
}
