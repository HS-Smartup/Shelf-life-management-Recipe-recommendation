package com.hsbug.backend.app.user_register;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class UserRegisterService implements UserDetailsService {

    private final UserRegisterRepository userRegisterRepository;      // accountRepository 가져옴

    @Transactional
    public void save(UserRegisterDto form) throws UsernameNotFoundException {       // 회원 정보 save
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        form.setPassword(encoder.encode(form.getPassword()));
        form.setRoles("ROLE_USER");
        userRegisterRepository.save(form.toEntity());
    }

    @Override       // 회원 정보 찾기
    public UserRegisterEntity loadUserByUsername(String username) throws UsernameNotFoundException,NullPointerException {
        //System.out.println(username);
        return userRegisterRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    public boolean checkUserByUsername(String username) throws UsernameNotFoundException,NullPointerException {
        Optional<UserRegisterEntity> check = userRegisterRepository.findByUsername(username);
        return check.isEmpty();
    }

    public void changepassword(String username, String password) throws UsernameNotFoundException {     // 비밀번호 변경
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String new_password = encoder.encode(password);
        String new_encoded_password = "{bcrypt}"+new_password;
        UserRegisterEntity account = loadUserByUsername(username);
        account.setPassword(new_encoded_password);
        userRegisterRepository.save(account);
    }

}
