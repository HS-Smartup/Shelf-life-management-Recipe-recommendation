package com.hsbug.backend.app.manage_user_info.change_password;

import com.hsbug.backend.app.user_register.UserRegisterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChangeUserRepository extends JpaRepository<UserRegisterEntity,Long> {

    Optional<UserRegisterEntity> findByEmail(String username);
}
