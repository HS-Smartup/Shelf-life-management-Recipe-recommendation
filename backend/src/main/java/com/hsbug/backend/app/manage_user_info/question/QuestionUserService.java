package com.hsbug.backend.app.manage_user_info.question;

import com.hsbug.backend.admin_page.manage_question.ManageQuestionDto;
import com.hsbug.backend.admin_page.manage_question.ManageQuestionEntity;
import com.hsbug.backend.admin_page.manage_question.ManageQuestionRepository;
import com.hsbug.backend.admin_page.manage_question.ManageQuestionService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionUserService {

    private final ManageQuestionRepository manageQuestionRepository;
    private final ManageQuestionService manageQuestionService;

    public JSONObject readUserQuestion(){
        JSONObject obj = new JSONObject();
        ArrayList arr = new ArrayList();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        List<ManageQuestionEntity> questionList = manageQuestionRepository.findAllByEmail(email);
        for (int i = 0; i<questionList.size(); i++){
            arr.add(questionList.get(i));
        }
        obj.put("qa_list",arr);
        obj.put("status",200);
        return obj;
    }

    public JSONObject readUserQuestionDetail(Long id){
        Optional<ManageQuestionEntity> question = manageQuestionRepository.findById(id);
        ArrayList arr = new ArrayList<>();
        JSONObject obj = new JSONObject();
        obj.put("qa_detail",arr.add(question.get()));
        obj.put("status",200);
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
