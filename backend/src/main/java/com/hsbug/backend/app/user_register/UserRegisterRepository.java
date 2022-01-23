package com.hsbug.backend.app.user_register;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRegisterRepository extends JpaRepository<UserRegisterEntity, Long> {

    Optional<UserRegisterEntity> findByUsername(String username);
    Optional<UserRegisterEntity> findByEmail(String username);
}
