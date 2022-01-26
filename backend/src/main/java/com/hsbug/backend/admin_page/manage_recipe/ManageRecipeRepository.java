package com.hsbug.backend.admin_page.manage_recipe;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManageRecipeRepository extends JpaRepository<ManageRecipeEntity,Long> {

    Optional<ManageRecipeEntity> findByRCPSEQ(String RCP_SEQ);
    Optional <ManageRecipeEntity> findById(Long id);
}
