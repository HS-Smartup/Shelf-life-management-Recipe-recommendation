package com.hsbug.backend.app.recipe.recipe_detail.recipe_attribute;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeIngredientsRepository extends JpaRepository<RecipeIngredients,Long> {
    RecipeIngredients findByIngredientName(String ingredientName);

    List<RecipeIngredients> findAllByRecipeEntityId_Id(@Param(value = "RECIPE_ID")Long id);
}
