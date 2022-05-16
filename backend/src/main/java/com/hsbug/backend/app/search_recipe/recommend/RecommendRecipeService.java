package com.hsbug.backend.app.search_recipe.recommend;

import com.hsbug.backend.app.recipe.recipe_detail.RecipeEntity;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class RecommendRecipeService {

    private final RecipeRepository recipeRepository;

    public RecommendRecipeDto randomRecipe() {

        Long randomNum = (long) makeRandomId();
        RecipeEntity recommendRecipeDto  = recipeRepository.findById(randomNum).get();

        RecommendRecipeDto recipeDto = RecommendRecipeDto.builder()
                .id(recommendRecipeDto.getId())
                .recipeMainImage(recommendRecipeDto.getRecipeMainImage())
                .recipeName(recommendRecipeDto.getRecipeName())
                .recipeViews(recommendRecipeDto.getRecipeViews())
                .recipeWriter(recommendRecipeDto.getRecipeWriter())
                .build();

        return recipeDto;
    }

    private int makeRandomId() {
        int rNum = 0;
        Random random = new Random();
        int max = 10;
        int min = 3;
        //rNum = random.nextInt(recipeRepository.getMaxId().intValue()) + 1;
        rNum = random.nextInt(max - min ) + min;
        return rNum;
    }

}
