package com.hsbug.backend.admin_page.manage_question;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ManageQuestionRepository extends JpaRepository<ManageQuestionEntity,Long> {
    List<ManageQuestionEntity> findAllByAnswercheck(boolean answercheck);
    Optional<ManageQuestionEntity> findById(Long id);
    ManageQuestionEntity findAllById(Long id);
    List<ManageQuestionEntity> findAllByEmail(String Email);
}
