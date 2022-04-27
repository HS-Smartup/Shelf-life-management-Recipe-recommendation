package com.hsbug.backend.app.user_register;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRegisterRepository extends JpaRepository<UserRegisterEntity, Long> {

    Optional<UserRegisterEntity> findByUsername(String username);
    List<UserRegisterEntity> findAllByRoles(String Roles);
    Optional<UserRegisterEntity> findByEmail(String username);
    Optional<UserRegisterEntity> findByNaversub(String naver_sub);
    Optional<UserRegisterEntity> findByGooglesub(String google_sub);
    Optional<UserRegisterEntity> findByKakaosub(String kakao_sub);


}
