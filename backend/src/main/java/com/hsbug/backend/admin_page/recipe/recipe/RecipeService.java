package com.hsbug.backend.admin_page.recipe.recipe;

import com.hsbug.backend.admin_page.recipe.recipeStep.RecipeStepDTO;
import com.hsbug.backend.admin_page.recipe.recipeStep.RecipeStepEntity;
import com.hsbug.backend.admin_page.recipe.recipeStep.RecipeStepRepository;
import com.hsbug.backend.admin_page.recipe.recipe_attribute.RecipeIngredients;
import com.hsbug.backend.admin_page.recipe.recipe_attribute.RecipeIngredientsDTO;
import com.hsbug.backend.admin_page.recipe.recipe_attribute.RecipeIngredientsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
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
        List<RecipeIngredients> recipeIngredients = new ArrayList<>();
        List<RecipeStepEntity> recipeStepEntityList = new ArrayList<>();
        List<RecipeIngredientsDTO> dtoRecipeIngredientsList = dto.getRecipeIngredients();
        List<RecipeStepDTO> dtoRecipeStepEntityList = dto.getRecipeStep();

        recipeRepository.save(recipe);          //레시피 저장
        for (RecipeIngredientsDTO ingredients : dtoRecipeIngredientsList) {     //재료 저장
            RecipeIngredients recipeIngredient = ingredients.toEntity();
            recipeIngredient.setRecipeEntityId(recipe);
            recipeIngredients.add(recipeIngredient);
        }
        recipeIngredientsRepository.saveAll(recipeIngredients);

        for (RecipeStepDTO recipeStepEntity : dtoRecipeStepEntityList) {    //recipeStep 저장
            RecipeStepEntity recipeStep = recipeStepEntity.toEntity();
            recipeStep.setRecipeEntity(recipe);
            recipeStepEntityList.add(recipeStep);
        }
        recipeStepRepository.saveAll(recipeStepEntityList);

        return recipe.getId();
    }
    @Transactional
    public void recipeCount(Long id) {
        RecipeEntity recipeEntity = recipeRepository.findById(id).get();
        recipeEntity.setRecipeViews(recipeEntity.getRecipeViews()+1);
    }


    public RecipeJsonDTO findDetail(Long id) {
        RecipeJsonDTO dto = recipeRepository.findById(id).get().toDto();
        List<RecipeIngredients> ingredientsList = recipeIngredientsRepository.findAllByRecipeEntityId_Id(id);
        List<RecipeStepEntity> stepEntityList = recipeStepRepository.findAllByRecipeEntityId(id);
        dto.setRecipeIngredients(this.toIngredientsDtoList(ingredientsList));
        dto.setRecipeStep(this.toStepDtoList(stepEntityList));
        return dto;
    }


    public List<RecipeIngredientsDTO> toIngredientsDtoList(List<RecipeIngredients>ingredientsList) {
        List<RecipeIngredientsDTO> recipeIngredientsDTOList = new ArrayList<>();
        for (RecipeIngredients ingredients: ingredientsList) {
            RecipeIngredientsDTO dto = ingredients.toDto();
            recipeIngredientsDTOList.add(dto);
        }
        return recipeIngredientsDTOList;
    }

    public List<RecipeStepDTO> toStepDtoList(List<RecipeStepEntity> recipeStepEntityList) {
        List<RecipeStepDTO> recipeStepDTOList = new ArrayList<>();
        for (RecipeStepEntity recipeStepEntity : recipeStepEntityList) {
            RecipeStepDTO dto = recipeStepEntity.toDto();
            recipeStepDTOList.add(dto);
        }
        return recipeStepDTOList;
    }

}
