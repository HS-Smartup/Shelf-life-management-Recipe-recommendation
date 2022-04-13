package com.hsbug.backend.app.recipe.recently_viewed_recipes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class RecentlyViewRecipeDto {
    private Long recipeId;
    private String userEmail;
}
