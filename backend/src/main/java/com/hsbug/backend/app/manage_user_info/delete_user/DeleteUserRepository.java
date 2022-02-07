package com.hsbug.backend.app.manage_user_info.delete_user;



import com.hsbug.backend.app.user_register.UserRegisterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeleteUserRepository extends JpaRepository<UserRegisterEntity, Long> {

    Optional<UserRegisterEntity> findByUsername(String username);
    Optional<UserRegisterEntity> deleteByEmail(String email);
}
