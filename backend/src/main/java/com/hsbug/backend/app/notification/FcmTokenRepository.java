package com.hsbug.backend.app.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.desktop.OpenFilesEvent;
import java.util.List;
import java.util.Optional;

@Repository
public interface FcmTokenRepository extends JpaRepository<FcmTokenEntity,Long> {
    FcmTokenEntity findByEmail(String email);
    Optional<FcmTokenEntity> findAllByEmail(String email);
}
