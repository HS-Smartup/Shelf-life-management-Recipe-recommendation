package com.hsbug.backend.app.recipe.popular_recipe;

import com.hsbug.backend.app.recipe.recently_viewed_recipes.RecentlyViewRecipe;
import com.hsbug.backend.app.recipe.recently_viewed_recipes.RecentlyViewRecipeDto;
import com.hsbug.backend.app.recipe.recently_viewed_recipes.RecentlyViewRecipeService;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeEntity;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class PopularRecipeController {

    private final RecipeRepository recipeRepository;

    @GetMapping("/popular")
    private JSONObject popularRecipe() {
        JSONObject obj = new JSONObject();
        List<RecipeEntity> popularRecipe= recipeRepository.findTop10ByOrderByRecipeViewsDesc();
        List arr = new ArrayList<>();
        for (int i = 0; i<10; i++){
            System.out.println(popularRecipe.get(i).getId());
            JSONObject ob2 = new JSONObject();

            ob2.put("id",popularRecipe.get(i).getId());
            ob2.put("recipeMainImage",popularRecipe.get(i).getRecipeMainImage());
            ob2.put("recipeName",popularRecipe.get(i).getRecipeName());
            arr.add(ob2);
        }
        obj.put("recipe",arr);
        obj.put("status",200);
        return obj;
    }

}
