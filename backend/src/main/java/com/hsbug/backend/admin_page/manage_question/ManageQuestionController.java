package com.hsbug.backend.admin_page.manage_question;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class ManageQuestionController { //10초 정도 걸리는 듯.

    private final ManageQuestionService manageQuestionService;

    @GetMapping("/question/no_answer")
    public JSONObject readAdminNoAnswer(){
        JSONObject obj = manageQuestionService.readNoAnswer();
        return obj;

    }

    @GetMapping("/question/already_answer")
    public JSONObject readAdminAlreadyAnswer(){
        JSONObject obj = manageQuestionService.readAlreadyAnswer();
        return obj;
    }

    @PostMapping("/question/no_answer/answer")
    public JSONObject answerAdminNoAnswer(@RequestBody ManageQuestionDto manageQuestionDto){
        Long id = manageQuestionDto.getId();
        String answer = manageQuestionDto.getAnswer();
        JSONObject obj  = manageQuestionService.addAnswer(id,answer);
        return obj;
    }

}
