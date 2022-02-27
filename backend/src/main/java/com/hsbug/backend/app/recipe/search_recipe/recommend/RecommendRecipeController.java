package com.hsbug.backend.app.recipe.search_recipe.recommend;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/user/recommend")
@RequiredArgsConstructor
@Slf4j
public class RecommendRecipeController {

    private final RecommendRecipeService recommendRecipeService;

    @GetMapping("/random")
    @ResponseBody
    public Map<String, RecommendRecipeDto> searchRecipeDemo(){
//        JSONObject obj = new JSONObject();
        Map<String, RecommendRecipeDto> randomRecipeMap = new HashMap<>();
//        List<RecommendRecipeDto> randomRecipe = new ArrayList<>();
        for (int i = 0; i < 30; i++) {
            RecommendRecipeDto recipeDto = recommendRecipeService.randomRecipe();
//            randomRecipe.add(recipeDto);
            String recipe = "recipe" + String.valueOf(i+1);
            randomRecipeMap.put(recipe, recipeDto);
        }
//        log.info("randomRecipe = {}", randomRecipe);
//        obj.put("randomRecipe",randomRecipeMap);
        return randomRecipeMap;
    }

}
