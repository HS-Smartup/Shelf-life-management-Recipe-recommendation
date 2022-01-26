package com.hsbug.backend.admin_page.manage_recipe;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ManageRecipeService {

    private final ManageRecipeRepository manageRecipeRepository;

    public ManageRecipeService(ManageRecipeRepository manageRecipeRepository) {
        this.manageRecipeRepository = manageRecipeRepository;
    }


    @Transactional
    public void saveAndUpdate(ManageRecipeDto recipeDto){
        manageRecipeRepository.save(recipeDto.toEntity());
    }
}
