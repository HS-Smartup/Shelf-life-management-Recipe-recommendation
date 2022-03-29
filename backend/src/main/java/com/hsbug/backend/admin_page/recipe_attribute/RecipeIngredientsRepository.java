package com.hsbug.backend.admin_page.recipe_attribute;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeIngredientsRepository extends JpaRepository<RecipeIngredients,Long> {
    RecipeIngredients findByIngredientName(String ingredientName);

    List findAllByRecipeEntityId_Id(@Param(value = "RECIPE_ID")Long id);
}
