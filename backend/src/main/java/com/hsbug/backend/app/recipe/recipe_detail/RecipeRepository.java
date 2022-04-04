package com.hsbug.backend.app.recipe.recipe_detail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeEntity,Long> {
    List<RecipeEntity> findAllByRecipeWriter(String email);
    List<RecipeEntity> findAllByTypeCategory(String typeCategory);
    List<RecipeEntity> findAllBySituationCategory(String situationCategory);
    List<RecipeEntity> findAllByIngredientCategory(String ingredientCategory);
    List<RecipeEntity> findAllByMethodCategory(String methodCategory);
}
