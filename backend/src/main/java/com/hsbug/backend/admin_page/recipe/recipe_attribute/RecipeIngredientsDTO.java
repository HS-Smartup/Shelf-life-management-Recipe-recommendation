package com.hsbug.backend.admin_page.recipe.recipe_attribute;

import lombok.Data;

@Data
public class RecipeIngredientsDTO {
    private String ingredientName;
    private String ingredientAmount;

    public RecipeIngredients toEntity() {
        return RecipeIngredients.builder()
                .ingredientName(this.ingredientName)
                .ingredientAmount(this.ingredientAmount)
                .build();
    }

}
