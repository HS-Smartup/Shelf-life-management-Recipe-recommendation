package com.hsbug.backend.admin_page.manage_question;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
public class ManageQuestionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    private String title;
    private String email;
    private String content;
    private String answer;
    private boolean answercheck;


    @Builder
    public ManageQuestionEntity(Long id, String title, String email, String content, String answer, boolean answercheck) {
        this.id = id;
        this.title = title;
        this.email = email;
        this.content = content;
        this.answer = answer;
        this.answercheck = answercheck;
    }
}
