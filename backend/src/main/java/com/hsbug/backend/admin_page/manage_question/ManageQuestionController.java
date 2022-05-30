package com.hsbug.backend.admin_page.manage_question;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/QA")
public class ManageQuestionController { //10초 정도 걸리는 듯.

    private final ManageQuestionService manageQuestionService;

    @GetMapping("")
    public String QA(Model model){
        List<ManageQuestionDto> QuestionDto = manageQuestionService.readAll();

        model.addAttribute("QA",QuestionDto);
        return "QuestionAnswer";
    }

    @GetMapping("/already_answer")
    public String QA_already(Model model){
        List<ManageQuestionDto> QuestionDto = manageQuestionService.readAlreadyAnswer();
        model.addAttribute("QA",QuestionDto);
        return "QuestionAnswer";
    }


    @PostMapping("/no_answer/answer")  // 05.01 이건 아직 수정 안함
    public JSONObject answerAdminNoAnswer(@RequestParam Long id, String answer){
        JSONObject obj  = manageQuestionService.addAnswer(id,answer);
        return obj;
    }




}
