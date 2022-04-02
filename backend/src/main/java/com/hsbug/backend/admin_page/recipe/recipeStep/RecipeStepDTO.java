package com.hsbug.backend.admin_page.recipe.recipeStep;

import lombok.Data;

@Data
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
