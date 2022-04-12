package com.hsbug.backend.app.recipe.recently_viewed_recipes;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecentlyViewRecipe {

    @Id
    @GeneratedValue
    private Long id;
    private Long recipeId;
    private String userEmail;

    public RecentlyViewRecipeDto toDto() {
        return RecentlyViewRecipeDto.builder()
                .recipeId(this.recipeId)
                .userEmail(this.userEmail)
                .build();
    }
}
