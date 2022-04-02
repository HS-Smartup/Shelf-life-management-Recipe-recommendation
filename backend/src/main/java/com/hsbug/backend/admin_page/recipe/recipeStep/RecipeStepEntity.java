package com.hsbug.backend.admin_page.recipe.recipeStep;

import com.hsbug.backend.admin_page.recipe.recipe.RecipeEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeStepEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "RECIPE_ID")
    private RecipeEntity recipeEntity;

    private String stepImage;
    private String stepDescription;

    public RecipeStepDTO toDto() {
        RecipeStepDTO dto = new RecipeStepDTO();
        dto.setStepImage(this.stepImage);
        dto.setStepDescription(this.stepDescription);
        return dto;
    }

}
