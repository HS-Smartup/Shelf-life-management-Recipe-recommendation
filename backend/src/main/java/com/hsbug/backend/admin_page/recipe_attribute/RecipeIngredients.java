package com.hsbug.backend.admin_page.recipe_attribute;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class RecipeIngredients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recipeIngredientsId;

    @ManyToOne
    @JoinColumn(name = "RECIPE_ID")
    private ManageRecipeEntity recipeEntityId;

    public void changeRecipeEntityId(ManageRecipeEntity recipeEntityId) {
        if (this.recipeEntityId != null) {
            this.recipeEntityId.getRecipeIngredientsList().remove(this);
        }
        this.recipeEntityId = recipeEntityId;
        recipeEntityId.getRecipeIngredientsList().add(this);
    }

    private String ingredientName;
    private String ingredientAmount;

    public RecipeIngredients(String ingredientName, String ingredientAmount) {
        this.ingredientName = ingredientName;
        this.ingredientAmount = ingredientAmount;
    }

}
