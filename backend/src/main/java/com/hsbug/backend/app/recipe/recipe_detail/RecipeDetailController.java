package com.hsbug.backend.app.recipe.recipe_detail;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/recipe")
public class RecipeDetailController {
    private final RecipeService recipeService;

    @GetMapping("/detail")
    public JSONObject recipeDetail(@RequestParam Long id) {
        JSONObject obj = new JSONObject();
        recipeService.recipeCount(id);
        obj.put("recipe_detail",recipeService.findDetail(id));
        obj.put("status", 200);
        return obj;
    }

//    @PostMapping("/category")
//    public List<SearchRecipeRefrigDto> categoryList(@RequestBody CategorySetDto category) {
////        recipeService
//    }
}
