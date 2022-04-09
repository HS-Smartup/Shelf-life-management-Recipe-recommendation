package com.hsbug.backend.app.recipe.recipe_detail;

import com.hsbug.backend.app.recipe.recipe_detail.category.IngredientsCategory;
import com.hsbug.backend.app.recipe.recipe_detail.category.MethodCategory;
import com.hsbug.backend.app.recipe.recipe_detail.category.SituationCategory;
import com.hsbug.backend.app.recipe.recipe_detail.category.TypeCategory;
import lombok.Data;

@Data
public class CategorySetDto {
    private TypeCategory typeCategory;
    private SituationCategory situationCategory;
    private IngredientsCategory ingredientCategory;
    private MethodCategory methodCategory;
}
