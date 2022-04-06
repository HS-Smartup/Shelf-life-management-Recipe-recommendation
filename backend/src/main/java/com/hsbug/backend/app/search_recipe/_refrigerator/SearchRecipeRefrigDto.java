package com.hsbug.backend.app.search_recipe._refrigerator;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter@Builder
public class SearchRecipeRefrigDto {
    private Long id;
    private String recipeName;
    private String recipeImg;
    private int views;
    private float stars;

}
