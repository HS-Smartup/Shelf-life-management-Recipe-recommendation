package com.hsbug.backend.app.recipe.recipe_detail.recipeStep;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeStepRepository extends JpaRepository<RecipeStepEntity, Long> {
    List<RecipeStepEntity> findAllByRecipeEntityId(Long id);
    List<RecipeStepEntity> deleteAllByRecipeEntityId(Long id);

}
