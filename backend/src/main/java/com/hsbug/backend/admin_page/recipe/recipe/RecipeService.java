package com.hsbug.backend.admin_page.recipe.recipe;

import com.hsbug.backend.admin_page.recipe.recipeStep.RecipeStepEntity;
import com.hsbug.backend.admin_page.recipe.recipeStep.RecipeStepRepository;
import com.hsbug.backend.admin_page.recipe.recipe_attribute.RecipeIngredients;
import com.hsbug.backend.admin_page.recipe.recipe_attribute.RecipeIngredientsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeIngredientsRepository recipeIngredientsRepository;
    private final RecipeStepRepository recipeStepRepository;

    @Transactional
    public Long saveRecipe(RecipeJsonDTO dto) {
        RecipeEntity recipe = dto.toEntity();       //레시피 객체생성
        List<RecipeIngredients> dtoRecipeIngredientsList = dto.getRecipeIngredients();
        List<RecipeStepEntity> recipeStepEntityList = dto.getRecipeStep();
        recipeRepository.save(recipe);          //레시피 저장
        for (RecipeIngredients ingredients:dtoRecipeIngredientsList) {      //재료 저장
            ingredients.setRecipeEntityId(recipe);
        }
        recipeIngredientsRepository.saveAll(dtoRecipeIngredientsList);

        for (RecipeStepEntity recipeStepEntity : recipeStepEntityList) {    //recipeStep 저장
           recipeStepEntity.setRecipeEntity(recipe);
        }
        recipeStepRepository.saveAll(recipeStepEntityList);

        return recipe.getId();
    }


    public RecipeJsonDTO findDetail(Long id) {
        RecipeJsonDTO dto = recipeRepository.findById(id).get().toDto();
        List<RecipeIngredients> ingredientsList = recipeIngredientsRepository.findAllByRecipeEntityId_Id(id);
        List<RecipeStepEntity> stepEntityList = recipeStepRepository.findAllByRecipeEntityId(id);
        dto.setRecipeIngredients(ingredientsList);
        dto.setRecipeStep(stepEntityList);
        return dto;
    }
}
