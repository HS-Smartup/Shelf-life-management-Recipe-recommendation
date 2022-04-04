package com.hsbug.backend.app.recipe.recipe_detail.recipe_attribute;

import com.hsbug.backend.app.recipe.recipe_detail.RecipeEntity;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class RecipeIngredientsCheckDto {
    private RecipeEntity recipeEntityId;
    private String ingredientName;
    private String ingredientAmount;

    public RecipeIngredientsDTO toDto() {
        RecipeIngredientsDTO dto = new RecipeIngredientsDTO();
        dto.setIngredientName(this.ingredientName);
        dto.setIngredientAmount(this.ingredientAmount);
        return dto;
    }
}
