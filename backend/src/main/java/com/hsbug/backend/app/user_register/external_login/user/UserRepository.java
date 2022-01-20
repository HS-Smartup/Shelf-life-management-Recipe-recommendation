package com.hsbug.backend.app.user_register.external_login.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<OAuth2UserEntity,Long> {
    Optional<OAuth2UserEntity> findByEmail(String email);
}
