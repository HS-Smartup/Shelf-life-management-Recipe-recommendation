package com.hsbug.backend.app.manage_user_info.question;

import com.hsbug.backend.admin_page.manage_question.ManageQuestionDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class QuestionUserController {

    private final QuestionUserService questionUserService;

    @GetMapping("/question/read")
    public JSONObject userQuestionRead(){
        JSONObject obj;
        obj = questionUserService.readUserQuestion();
        return obj;
    }

    @PostMapping("/question/add")
    public JSONObject userQuestionAdd(@RequestBody ManageQuestionDto manageQuestionDto){
        JSONObject obj = new JSONObject();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        manageQuestionDto.setEmail(email);
        manageQuestionDto.setAnswercheck(false);
        System.out.println(manageQuestionDto);
        return questionUserService.save(manageQuestionDto);
    }
}
