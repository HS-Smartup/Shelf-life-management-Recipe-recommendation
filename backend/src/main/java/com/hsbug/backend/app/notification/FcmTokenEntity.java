package com.hsbug.backend.app.notification;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class FcmTokenEntity {

    @Id @Column       // SQL에서 자동 생성되도록 돕는 어노테이션
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String token;


}
