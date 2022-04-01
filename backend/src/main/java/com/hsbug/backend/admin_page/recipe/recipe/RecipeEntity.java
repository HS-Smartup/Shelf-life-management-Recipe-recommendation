package com.hsbug.backend.admin_page.recipe.recipe;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RECIPE_ID")
    private Long id;
    private String recipeName;
    private String recipeWriter;
    private String recipeMainImage;
    private int recipeLikes;
    private int recipeViews;
    private float recipeStar; //recipeRationgs
    private int recipeRatingCount;
    private String recipeTime;
    private String recipeLevel;
    private String recipeServes;
    private String recipeDescription;
}
