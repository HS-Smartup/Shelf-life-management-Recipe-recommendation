package com.hsbug.backend.app.recipe.search_recipe.recommend;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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
    public Map<String, ArrayList> searchRecipeDemo(){
//        JSONObject obj = new JSONObject();
        Map<String, ArrayList> randomRecipeMap = new HashMap<>();
//        List<RecommendRecipeDto> randomRecipe = new ArrayList<>();
        ArrayList arr = new ArrayList<>();
        for (int i = 0; i < 30; i++) {
            RecommendRecipeDto recipeDto = recommendRecipeService.randomRecipe();
//            randomRecipe.add(recipeDto);
            arr.add(recipeDto);

        }
        randomRecipeMap.put("recipe", arr);
//        log.info("randomRecipe = {}", randomRecipe);
//        obj.put("randomRecipe",randomRecipeMap);
        return randomRecipeMap;
    }

}
