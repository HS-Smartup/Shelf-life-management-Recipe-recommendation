package com.hsbug.backend.admin_page.manage_question;

import com.hsbug.backend.app.refrigerator.manage_product.ManageProductDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ManageQuestionService {

    private final ManageQuestionRepository manageQuestionRepository;

    private ManageQuestionDto converEntityToDto(ManageQuestionEntity manageQuestionEntity){
        return ManageQuestionDto.builder()
                .id(manageQuestionEntity.getId())
                .title(manageQuestionEntity.getTitle())
                .email(manageQuestionEntity.getEmail())
                .content(manageQuestionEntity.getContent())
                .answer(manageQuestionEntity.getAnswer())
                .answercheck(manageQuestionEntity.isAnswercheck())
                .build();
    }

    public JSONObject readNoAnswer(){
        JSONObject obj = new JSONObject();
        List<ManageQuestionEntity> manageQuestionEntityList = manageQuestionRepository.findAllByAnswercheck(false);

        for(int i = 0; i < manageQuestionEntityList.size();i++){
            obj.put(i,manageQuestionEntityList.get(i));
        }
        return obj;
    }

    public JSONObject readAlreadyAnswer(){
        JSONObject obj = new JSONObject();
        List<ManageQuestionEntity> manageQuestionEntityList = manageQuestionRepository.findAllByAnswercheck(true);

        for(int i = 0; i < manageQuestionEntityList.size();i++){
            obj.put(i,manageQuestionEntityList.get(i));
        }
        return obj;
    }

    public JSONObject addAnswer(Long id, String answer) {
        JSONObject obj = new JSONObject();
        Optional<ManageQuestionEntity> manageQuestionEntity = manageQuestionRepository.findById(id);
        ManageQuestionDto question;

        question = this.converEntityToDto(manageQuestionEntity.get());
        question.setAnswer(answer);

        question.setAnswercheck(true);
        manageQuestionRepository.save(question.toEntity());

        return obj;
    }

}
