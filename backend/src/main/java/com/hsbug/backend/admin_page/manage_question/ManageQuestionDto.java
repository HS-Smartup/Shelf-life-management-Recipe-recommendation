package com.hsbug.backend.admin_page.manage_question;

import lombok.*;

@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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



