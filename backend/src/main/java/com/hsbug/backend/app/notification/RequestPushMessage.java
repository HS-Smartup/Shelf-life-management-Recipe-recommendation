package com.hsbug.backend.app.notification;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RequestPushMessage {

    REMAIN_DATE("",""),
    QUESTION("","");

    String title;
    String body;
}
