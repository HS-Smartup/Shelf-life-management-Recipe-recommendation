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

    private final RecipeIngredientsRepository recipeIngredientsRepository;
    private final RecipeRepository recipeRepository;
    private final RecipeStepRepository recipeStepRepository;

    @Transactional
    public Long saveRecipe(RecipeJsonDTO dto) {
        //레시피 객체생성
        RecipeEntity recipe = dto.toEntity();
        List<RecipeIngredients> dtoRecipeIngredientsList = dto.getRecipeIngredients();
        List<RecipeStepEntity> recipeStepEntityList = dto.getRecipeStep();
        //레시피 저장
        recipeRepository.save(recipe);
        //재료 저장
        for (RecipeIngredients ingredients:dtoRecipeIngredientsList) {
            ingredients.setRecipeEntityId(recipe);
        }
        recipeIngredientsRepository.saveAll(dtoRecipeIngredientsList);
        //recipeStep 저장
        for (RecipeStepEntity recipeStepEntity : recipeStepEntityList) {
           recipeStepEntity.setRecipeEntity(recipe);
        }
        recipeStepRepository.saveAll(recipeStepEntityList);

        return recipe.getId();
    }

    public List findIngredientsList(Long id) {
        return recipeIngredientsRepository.findAllByRecipeEntityId_Id(id);
    }
}
