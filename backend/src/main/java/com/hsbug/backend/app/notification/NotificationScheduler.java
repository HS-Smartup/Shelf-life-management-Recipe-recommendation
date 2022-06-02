package com.hsbug.backend.app.notification;


import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Arrays;

import static com.hsbug.backend.app.notification.RequestPushMessage.REMAIN_DATE;

@Slf4j
@Service
public class NotificationScheduler {

    String fireBaseCreateScoped = "https://www.googleapis.com/auth/firebase.messaging";
    String topic = "recipe-refrigerator";

    private FirebaseMessaging instance;

    @PostConstruct
    public void firebaseSetting() throws IOException{
        GoogleCredentials googleCredentials = GoogleCredentials.fromStream(new ClassPathResource("recipe-refrigerator-firebase-adminsdk-lx8r4-de0017b4cb.json").getInputStream())
                .createScoped((Arrays.asList(fireBaseCreateScoped)));
        FirebaseOptions secondaryAppConfig = FirebaseOptions.builder()
                .setCredentials(googleCredentials)
                .build();
        FirebaseApp app = FirebaseApp.initializeApp(secondaryAppConfig);
        this.instance = FirebaseMessaging.getInstance(app);
    }

    @Scheduled(cron = "0 09 23 * * ?")
    //@Scheduled(cron = "0 0 09 * * ?")
    public void push() throws FirebaseMessagingException{
        log.info("유통기한 확인 알람");
        pushAlarm(REMAIN_DATE);
    }

    private void pushAlarm(RequestPushMessage data) throws FirebaseMessagingException{
        Message message = getMessage(data);
        sendMessage(message);
    }

    private Message getMessage(RequestPushMessage data){
        Notification notification = Notification.builder().setTitle(data.getTitle()).setBody(data.getBody()).build();
        Message.Builder builder = Message.builder();
        Message message = builder.setTopic(topic).setNotification(notification).build();
        return message;
    }

    public String sendMessage(Message message) throws FirebaseMessagingException{
        return this.instance.send(message);
    }
}
