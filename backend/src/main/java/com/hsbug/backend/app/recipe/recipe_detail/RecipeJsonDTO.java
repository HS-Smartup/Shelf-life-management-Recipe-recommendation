package com.hsbug.backend.app.recipe.recipe_detail;

import com.hsbug.backend.app.recipe.recipe_detail.category.IngredientsCategory;
import com.hsbug.backend.app.recipe.recipe_detail.category.MethodCategory;
import com.hsbug.backend.app.recipe.recipe_detail.category.SituationCategory;
import com.hsbug.backend.app.recipe.recipe_detail.category.TypeCategory;
import com.hsbug.backend.app.recipe.recipe_detail.recipeStep.RecipeStepDTO;
import com.hsbug.backend.app.recipe.recipe_detail.recipe_attribute.RecipeIngredientsDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipeJsonDTO {

    private Long id;
    private String recipeName;
    private String recipeWriter;
    private String recipeMainImage;
    private TypeCategory typeCategory;
    private SituationCategory situationCategory;
    private IngredientsCategory ingredientCategory;
    private MethodCategory methodCategory;
    private int recipeLikes; //OK
    private int recipeViews;
    private float recipeStar; //recipeRationgs
    private int recipeRatingCount;
    private String recipeTime;
    private String recipeLevel;
    private String recipeServes;
    private String recipeDescription;
    private List<RecipeIngredientsDTO> recipeIngredients = new ArrayList<>();  //ok
    private List<RecipeStepDTO> recipeStep = new ArrayList<>();    //ok


    public RecipeEntity toEntity() {
        return RecipeEntity.builder()
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
}

/*  데이터 형식 예제
* {
      id: 1,
      recipeName: '콤비네이션 피자',
      recipeNumber: '123',
      recipeWriter: 'ssh',
      recipeMainImage: '',
      recipeLikes: '100',
      recipeViews: '200',
      recipeRatings: '4.5',
      recipeRatingsCount: '50',
      recipeTime: '100',
      recipeLevel: '어려움',
      recipeServes: '3',
      recipeDescription: '요리 설명 피자먹고싶다 피자먹고싶다.',
      recipeIngredients: [
        {ingredientName: '양파', ingredientAmount: '100g'},
        {ingredientName: '양파', ingredientAmount: '100g'},
        {ingredientName: '양파', ingredientAmount: '100g'},
        {ingredientName: '양파', ingredientAmount: '100g'},
        {ingredientName: '대파', ingredientAmount: '200g'},
        {ingredientName: '쪽파', ingredientAmount: '300g'},
      ],
      recipeStep: [
        {
          stepImage:
            'https://cdn.pixabay.com/photo/2022/02/23/18/11/drink-7031154_960_720.jpg',
          stepDescription:
            '피자는 시켜먹어야지~피자는 시켜먹어야지~피자는 시켜먹어야지~피자는 시켜먹어야지~',
        },
        {
          stepImage:
            'https://cdn.pixabay.com/photo/2022/02/23/18/11/drink-7031154_960_720.jpg',
          stepDescription: '피자는 시켜먹어야지~',
        },
        {
          stepImage:
            'https://cdn.pixabay.com/photo/2022/02/23/18/11/drink-7031154_960_720.jpg',
          stepDescription: '피자는 시켜먹어야지~',
        },
      ],
    },
  ]);
* */