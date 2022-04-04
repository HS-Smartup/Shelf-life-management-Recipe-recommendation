package com.hsbug.backend.app.recipe.recipe_ratings;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRatingRepository extends JpaRepository<RecipeRatingsEntity, Long> {
    List<RecipeRatingsEntity> findAllByRecipeId(Long id);
    RecipeRatingsEntity findByRecipeIdAndUser(Long id, String user);
}
