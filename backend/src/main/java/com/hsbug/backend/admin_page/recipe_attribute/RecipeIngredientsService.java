package com.hsbug.backend.admin_page.recipe_attribute;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeIngredientsService {

    private final RecipeIngredientsRepository recipeIngredientsRepository;
    private final ManageRecipeRepository manageRecipeRepository;
    @Transactional
    public Long saveRecipe(ManageRecipeDto dto) {
        //레시피 객체생성
        ManageRecipeEntity recipe = dto.toEntity();

        //재료 객체 생성 & 리스트 입력
        for (RecipeIngredients ingredients:dto.getRecipeIngredientsList()) {
            System.out.println("ingredients = " + ingredients);
            recipe.addRecipeIngredientsList(ingredients);
        }
        manageRecipeRepository.save(recipe);    //재료 저장하기

        return recipe.getId();
    }

    public List findIngredientsList(Long id) {
        return recipeIngredientsRepository.findAllByRecipeEntityId_Id(id);
    }
}
