package com.hsbug.backend.app.user_register;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class UserRegisterService implements UserDetailsService {

    private final UserRegisterRepository userRegisterRepository;      // accountRepository 가져옴

    @Transactional
    public void save(UserRegisterDto form) throws UsernameNotFoundException {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        form.setPassword(encoder.encode(form.getPassword()));
        userRegisterRepository.save(form.toEntity());
    }

    @Override
    public UserRegisterEntity loadUserByUsername(String username) throws UsernameNotFoundException,NullPointerException {
        //System.out.println(username);
        return userRegisterRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    public void deleteUser(String username) throws NullPointerException {
        Long memnum = userRegisterRepository.findByUsername(username).get().getId();
        System.out.println(memnum);
        userRegisterRepository.deleteById(memnum);
    }

    public void changepassword(String username, String password) throws UsernameNotFoundException {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String new_password = encoder.encode(password);
        String new_encoded_password = "{bcrypt}"+new_password;
        UserRegisterEntity account = loadUserByUsername(username);
        account.setPassword(new_encoded_password);
        userRegisterRepository.save(account);
    }

}
