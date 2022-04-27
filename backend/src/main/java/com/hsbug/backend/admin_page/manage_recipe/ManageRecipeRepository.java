package com.hsbug.backend.admin_page.manage_recipe;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ManageRecipeRepository extends JpaRepository<ManageRecipeEntity,Long> {

    Optional<ManageRecipeEntity> findById(Long id);
    List<ManageRecipeEntity> findAllByWRITER(String WRITER);
    List<ManageRecipeEntity> findByRCPPARTSDTLSContains(String RCPPARTSDTLS);
/*
    List<ManageRecipeEntity> findByRCP_NM(String RCP_NM);*/
}
