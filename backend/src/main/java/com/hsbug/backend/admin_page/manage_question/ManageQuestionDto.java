package com.hsbug.backend.admin_page.manage_question;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Builder
public class ManageQuestionDto {
    private Long id;
    private String title;
    private String content;
    private String email;
    private String answer;
    private boolean answercheck;

    public ManageQuestionEntity toEntity(){
        return ManageQuestionEntity.builder()
                .id(id)
                .title(title)
                .email(email)
                .content(content)
                .answer(answer)
                .answercheck(answercheck)
                .build();
    }

}



