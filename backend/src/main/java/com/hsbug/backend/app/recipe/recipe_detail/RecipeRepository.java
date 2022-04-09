package com.hsbug.backend.app.recipe.recipe_detail;

import com.hsbug.backend.app.recipe.recipe_detail.category.IngredientsCategory;
import com.hsbug.backend.app.recipe.recipe_detail.category.MethodCategory;
import com.hsbug.backend.app.recipe.recipe_detail.category.SituationCategory;
import com.hsbug.backend.app.recipe.recipe_detail.category.TypeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeEntity,Long> {
    List<RecipeEntity> findAllByRecipeWriter(String email);
    List<RecipeEntity> findAllByTypeCategory(TypeCategory typeCategory);
    List<RecipeEntity> findAllBySituationCategory(SituationCategory situationCategory);
    List<RecipeEntity> findAllByIngredientCategory(IngredientsCategory ingredientCategory);
    List<RecipeEntity> findAllByMethodCategory(MethodCategory methodCategory);
    List<RecipeEntity> findByRecipeNameContaining(String recipeName);
    Optional<RecipeEntity> findById(Long id);

}
