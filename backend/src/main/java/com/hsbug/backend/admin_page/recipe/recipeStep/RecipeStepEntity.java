package com.hsbug.backend.admin_page.recipe.recipeStep;

import com.hsbug.backend.admin_page.recipe.recipe.RecipeEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class RecipeStepEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "RECIPE_ID")
    private RecipeEntity recipeEntity;

    private String stepImage;
    private String stepDescription;

}
