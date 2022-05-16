package com.hsbug.backend.app.recipe.recipe_detail;

import com.hsbug.backend.app.recipe.recently_viewed_recipes.RecentlyViewRecipeService;
import com.hsbug.backend.app.search_recipe._refrigerator.SearchRecipeRefrigDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/recipe")
public class RecipeDetailController {
    private final RecipeService recipeService;
    private final RecentlyViewRecipeService recentlyViewRecipeService;

    @GetMapping("/detail")
    public JSONObject recipeDetail(@RequestParam Long id) {
        JSONObject obj = new JSONObject();
        recipeService.recipeCount(id);
        recentlyViewRecipeService.addRecentlyViewRecipe(id);
        obj.put("recipe_detail", recipeService.findDetail(id));
        obj.put("status", 200);
        return obj;
    }

    @GetMapping("/search/category")
    public List<SearchRecipeRefrigDto> categoryList(@RequestParam String category) {
        return recipeService.findCategoryRecipe(category);
    }

    @GetMapping("/popular/recipe")
    public Map<String, List<SearchRecipeRefrigDto>> popularRecipe() {
        Map<String, List<SearchRecipeRefrigDto>> map = new HashMap<>();
        List<SearchRecipeRefrigDto> dtoList = recipeService.mostViewRecipe();
        map.put("popularRecipeList", dtoList);
        return map;
    }
}
