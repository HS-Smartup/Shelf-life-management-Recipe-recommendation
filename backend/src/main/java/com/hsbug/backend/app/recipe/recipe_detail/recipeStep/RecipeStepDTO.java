package com.hsbug.backend.app.recipe.recipe_detail.recipeStep;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeStepDTO {

    private String stepImage;
    private String stepDescription;

    public RecipeStepEntity toEntity() {
        return RecipeStepEntity.builder()
                    .stepImage(this.stepImage)
                    .stepDescription(this.stepDescription)
                    .build();
    }
}
