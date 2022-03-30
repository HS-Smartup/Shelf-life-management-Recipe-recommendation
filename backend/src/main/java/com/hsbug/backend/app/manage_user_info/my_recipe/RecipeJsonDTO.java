package com.hsbug.backend.app.manage_user_info.my_recipe;

import com.hsbug.backend.admin_page.recipe_attribute.RecipeIngredients;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RecipeJsonDTO {

    private Long id;
    private String recipeName;
    private int recipeNumber;
    private String recipeWriter;
    private String recipeMainImage;
    private int recipeLikes;
    private int recipeViews;
    private float recipeStar; //recipeRationgs
    private int recipeRatingCount;
    private String recipeTime;
    private String recipeLevel;
    private int recipeServes;
    private String recipeDescription;
    private List<RecipeIngredients> recipeIngredients = new ArrayList<>();
    private List recpieStep = new ArrayList<>();
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