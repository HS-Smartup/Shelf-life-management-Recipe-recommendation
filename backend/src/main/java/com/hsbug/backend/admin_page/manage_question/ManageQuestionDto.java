package com.hsbug.backend.admin_page.manage_question;

import lombok.*;

@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManageQuestionDto {
    private Long id;        //아이디
    private String title;   //글제목
    private String content; //내용
    private String email;   //이메일
    private String answer; //답변
    private String date;
    private boolean answercheck;



    public ManageQuestionEntity toEntity(){
        return ManageQuestionEntity.builder()
                .id(id)
                .title(title)
                .email(email)
                .content(content)
                .answer(answer)
                .answercheck(answercheck)
                .date(date)
                .build();
    }

}



