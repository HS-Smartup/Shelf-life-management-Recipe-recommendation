package com.hsbug.backend.admin_page.recipe.recipe_ratings;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter@Setter
public class RecipeRatingsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RatingId")
    private Long id;

    private Long recipeId;
    private String user;
    private float starPoint;
}
