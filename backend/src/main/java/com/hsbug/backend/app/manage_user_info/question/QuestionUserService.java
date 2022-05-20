package com.hsbug.backend.app.manage_user_info.question;

import com.hsbug.backend.admin_page.manage_question.ManageQuestionDto;
import com.hsbug.backend.admin_page.manage_question.ManageQuestionEntity;
import com.hsbug.backend.admin_page.manage_question.ManageQuestionRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionUserService {

    private final ManageQuestionRepository manageQuestionRepository;

    public JSONObject readUserQuestion(){
        JSONObject obj = new JSONObject();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        List<ManageQuestionEntity> questionList = manageQuestionRepository.findAllByEmail(email);

        for (int i = 0; i<questionList.size(); i++){
            obj.put(i+1,questionList.get(i));
        }
        return obj;
    }

    public JSONObject save(ManageQuestionDto manageQuestionDto){
        JSONObject obj = new JSONObject();
        manageQuestionRepository.save(manageQuestionDto.toEntity());
        obj.put("message","저장 완료");
        obj.put("status",200);
        return obj;
    }
}
