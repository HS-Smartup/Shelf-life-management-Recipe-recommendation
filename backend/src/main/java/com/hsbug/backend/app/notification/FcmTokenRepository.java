package com.hsbug.backend.app.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FcmTokenRepository extends JpaRepository<FcmTokenEntity,Long> {
    FcmTokenEntity findByEmail(String email);
}
