package com.hsbug.backend.admin_page.recipeStep;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class RecipeStepEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "RECIPE_ID")
    private ManageRecipeEntity manageRecipeEntity;

    private String stepImage;
    private String stepDescription;

}
