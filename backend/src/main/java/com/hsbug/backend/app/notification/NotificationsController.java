package com.hsbug.backend.app.notification;


import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.hsbug.backend.app.refrigerator.api.ApiController;
import com.hsbug.backend.app.user_register.UserRegisterEntity;
import com.hsbug.backend.app.user_register.UserRegisterService;
import lombok.extern.slf4j.Slf4j;
import org.apiguardian.api.API;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
public class NotificationsController {

    @Autowired
    FcmService fcmService;

    @Autowired
    UserRegisterService userRegisterService;
    FcmTokenRepository fcmTokenRepository;

    @Value("${project.properties.firebase-multicast-message-size}")
    Long multicastMessageSize;

    @PostMapping(value = "/pushs/users")
    public void notificationUser() throws FirebaseMessagingException{
        List<UserRegisterEntity> user = userRegisterService.findByRefrigSomething();
        if (!user.isEmpty()){
            for (int i =0; i < user.size(); i++){
                UserRegisterEntity it = user.get(i);
                FcmTokenEntity fcmTokenEntity = fcmTokenRepository.findByEmail(it.getEmail());

                Notification notification = Notification.builder()
                        .setTitle("title")
                        .setBody("body")
                        .setImage(null)
                        .build();

                Message.Builder builder = Message.builder();

                Message msg = builder
                        //.setToken(fcmTokenEntity.getToken()) // 이거 풀어서 사용
                        .setToken("token")
                        .setNotification(notification)
                        .build();
                fcmService.sendMessage(msg);


            }

        }
    }
}
