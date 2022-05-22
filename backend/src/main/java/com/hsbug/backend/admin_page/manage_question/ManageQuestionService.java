package com.hsbug.backend.admin_page.manage_question;

import com.hsbug.backend.app.refrigerator.manage_product.ManageProductDto;
import com.hsbug.backend.app.refrigerator.manage_product.ManageProductEntity;
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

    public ManageQuestionDto converEntityToDto(ManageQuestionEntity manageQuestionEntity){
        return ManageQuestionDto.builder()
                .id(manageQuestionEntity.getId())
                .title(manageQuestionEntity.getTitle())
                .email(manageQuestionEntity.getEmail())
                .content(manageQuestionEntity.getContent())
                .answer(manageQuestionEntity.getAnswer())
                .answercheck(manageQuestionEntity.isAnswercheck())
                .build();
    }

    public List<ManageQuestionDto> readAll(){
        List<ManageQuestionEntity> manageQuestionEntityList = manageQuestionRepository.findAll();
        List<ManageQuestionDto> manageQuestionDtoList = new ArrayList<>();

        for(ManageQuestionEntity manageQuestionEntity : manageQuestionEntityList){
            manageQuestionDtoList.add(this.converEntityToDto(manageQuestionEntity));
        }
        return manageQuestionDtoList;
    }

    public List<ManageQuestionDto> readNoAnswer(){
        List<ManageQuestionEntity> manageQuestionEntityList = manageQuestionRepository.findAllByAnswercheck(false);
        List<ManageQuestionDto> manageQuestionDtoList = new ArrayList<>();

        for(ManageQuestionEntity manageQuestionEntity : manageQuestionEntityList){
            manageQuestionDtoList.add(this.converEntityToDto(manageQuestionEntity));
        }
        return manageQuestionDtoList;
    }

    public List<ManageQuestionDto> readAlreadyAnswer(){
        List<ManageQuestionEntity> manageQuestionEntityList = manageQuestionRepository.findAllByAnswercheck(true);
        List<ManageQuestionDto> manageQuestionDtoList = new ArrayList<>();

        for(ManageQuestionEntity manageQuestionEntity : manageQuestionEntityList){
            manageQuestionDtoList.add(this.converEntityToDto(manageQuestionEntity));
        }
        return manageQuestionDtoList;
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
