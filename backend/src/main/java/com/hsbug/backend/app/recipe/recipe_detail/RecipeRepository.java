package com.hsbug.backend.app.recipe.recipe_detail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeEntity,Long> {
    List<RecipeEntity> findAllByRecipeWriter(String email);
    List<RecipeEntity> findAllByTypeCategory(String typeCategory);
    List<RecipeEntity> findAllBySituationCategory(String situationCategory);
    List<RecipeEntity> findAllByIngredientCategory(String ingredientCategory);
    List<RecipeEntity> findAllByMethodCategory(String methodCategory);
    List<RecipeEntity> findByRecipeNameContaining(String recipeName);
    Optional<RecipeEntity> findById(Long id);

    @Query(value = "SELECT coalesce(max(id), 0) FROM RecipeEntity ")
    public Long getMaxId();

    List<RecipeEntity> findTop10ByOrderByRecipeViewsDesc();
    List<RecipeEntity> findTop5ByIngredientCategoryOrderByRecipeViews(String ingredientCategory);
}
