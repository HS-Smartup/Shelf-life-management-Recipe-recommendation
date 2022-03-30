package com.hsbug.backend.admin_page.recipe_attribute;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeRepository;
import com.hsbug.backend.admin_page.recipeStep.RecipeStepEntity;
import com.hsbug.backend.admin_page.recipeStep.RecipeStepRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeIngredientsService {

    private final RecipeIngredientsRepository recipeIngredientsRepository;
    private final ManageRecipeRepository manageRecipeRepository;
    private final RecipeStepRepository recipeStepRepository;

    @Transactional
    public Long saveRecipe(ManageRecipeDto dto) {
        //레시피 객체생성
        ManageRecipeEntity recipe = dto.toEntity();
        List<RecipeIngredients> dtoRecipeIngredientsList = dto.getRecipeIngredientsList();
        List<RecipeStepEntity> recipeStepEntityList = dto.getRecipeStepEntityList();
        //레시피 저장
        manageRecipeRepository.save(recipe);
        //재료 저장
        for (RecipeIngredients ingredients:dtoRecipeIngredientsList) {
            ingredients.setRecipeEntityId(recipe);
        }
        recipeIngredientsRepository.saveAll(dtoRecipeIngredientsList);
        //recipeStep 저장
        for (RecipeStepEntity recipeStepEntity : recipeStepEntityList) {
           recipeStepEntity.setManageRecipeEntity(recipe);
        }
        recipeStepRepository.saveAll(recipeStepEntityList);

        return recipe.getId();
    }

    public List findIngredientsList(Long id) {
        return recipeIngredientsRepository.findAllByRecipeEntityId_Id(id);
    }
}
