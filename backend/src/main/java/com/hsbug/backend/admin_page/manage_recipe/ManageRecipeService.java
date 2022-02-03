package com.hsbug.backend.admin_page.manage_recipe;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ManageRecipeService {

    private final ManageRecipeRepository manageRecipeRepository;

    @Transactional
    public void saveRecipe(Long id, ManageRecipeDto recipeDto){
        Optional<ManageRecipeEntity> optionalRecipe = manageRecipeRepository.findById(id);
        if (!optionalRecipe.isPresent()){ //값 있는지 확인
                manageRecipeRepository.save(recipeDto.toEntity());
            }else{  //값 있으므로 업데이트
                ManageRecipeEntity recipe = optionalRecipe.get();

                recipeDto.setRCP_ID(recipe.getId());
                manageRecipeRepository.save(recipeDto.toEntity());
            }

        // 값 없으면 저장
        manageRecipeRepository.save(recipeDto.toEntity());
    }



}
