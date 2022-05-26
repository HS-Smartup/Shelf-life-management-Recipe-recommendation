package com.hsbug.backend.app.recipe.recipe_detail.recipeStep;

import com.hsbug.backend.app.recipe.recipe_detail.RecipeEntity;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "RECIPE_ID")
    private RecipeEntity recipeEntity;
    @Column(columnDefinition = "LongText")
    private String stepImage;
    private String stepDescription;

    public RecipeStepDTO toDto() {
        RecipeStepDTO dto = new RecipeStepDTO();
        dto.setStepImage(this.stepImage);
        dto.setStepDescription(this.stepDescription);
        return dto;
    }

}
