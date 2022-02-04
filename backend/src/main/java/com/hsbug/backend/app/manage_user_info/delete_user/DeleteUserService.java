package com.hsbug.backend.app.manage_user_info.delete_user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class DeleteUserService {

    private final DeleteUserRepository deleteUserRepository;

    @Transactional
    public void deleteUser(String username) throws NullPointerException {       //회원 탈퇴
        System.out.println(username);
        Long user = deleteUserRepository.findByUsername(username).get().getId();
        System.out.println(user);
        deleteUserRepository.deleteById(user);
    }
}
