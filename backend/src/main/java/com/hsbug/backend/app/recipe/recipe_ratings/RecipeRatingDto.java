package com.hsbug.backend.app.recipe.recipe_ratings;

import lombok.Data;

@Data
public class RecipeRatingDto {
    private Long id;
    private Long recipeId;
    private String user;
    private float starPoint;

    public RecipeRatingsEntity toEntity() {
        RecipeRatingsEntity recipeRatingsEntity = new RecipeRatingsEntity();
        recipeRatingsEntity.setId(this.id);
        recipeRatingsEntity.setRecipeId(this.recipeId);
        recipeRatingsEntity.setUser(this.user);
        recipeRatingsEntity.setStarPoint(this.starPoint);
        return recipeRatingsEntity;
    }
}
