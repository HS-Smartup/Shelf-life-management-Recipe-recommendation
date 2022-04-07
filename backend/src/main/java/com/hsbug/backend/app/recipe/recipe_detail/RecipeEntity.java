package com.hsbug.backend.app.recipe.recipe_detail;

import com.hsbug.backend.app.recipe.recipe_detail.category.IngredientsCategory;
import com.hsbug.backend.app.recipe.recipe_detail.category.MethodCategory;
import com.hsbug.backend.app.recipe.recipe_detail.category.SituationCategory;
import com.hsbug.backend.app.recipe.recipe_detail.category.TypeCategory;
import com.hsbug.backend.app.search_recipe._refrigerator.SearchRecipeRefrigDto;
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
    @Enumerated(EnumType.STRING)
    private TypeCategory typeCategory;
    @Enumerated(EnumType.STRING)
    private SituationCategory situationCategory;
    @Enumerated(EnumType.STRING)
    private IngredientsCategory ingredientCategory;
    @Enumerated(EnumType.STRING)
    private MethodCategory methodCategory;
    private int recipeLikes; // 좋아요 OK
    private int recipeViews; // 방문자수
    private float recipeStar; //recipeRationgs
    private int recipeRatingCount;
    private String recipeTime;
    private String recipeLevel;
    private String recipeServes;
    private String recipeDescription;

    public RecipeJsonDTO toDto(){
        return RecipeJsonDTO.builder()
                .id(this.id)
                .recipeName(this.recipeName)
                .recipeWriter(this.recipeWriter)
                .recipeMainImage(this.recipeMainImage)
                .typeCategory(this.typeCategory)
                .situationCategory(this.situationCategory)
                .ingredientCategory(this.ingredientCategory)
                .methodCategory(this.methodCategory)
                .recipeLikes(this.recipeLikes)
                .recipeViews(this.recipeViews)
                .recipeStar(this.recipeStar)
                .recipeRatingCount(this.recipeRatingCount)
                .recipeTime(this.recipeTime)
                .recipeLevel(this.recipeLevel)
                .recipeServes(this.recipeServes)
                .recipeDescription(this.recipeDescription)
                .build();
    }

    public SearchRecipeRefrigDto toSearchResultDto() {
        return SearchRecipeRefrigDto.builder()
                .id(this.id)
                .recipeName(this.recipeName)
                .recipeImg(this.recipeMainImage)
                .views(this.recipeViews)
                .stars(this.recipeStar)
                .build();
    }
}
