package com.hsbug.backend.app.search_recipe.recommend;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
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
    public JSONObject searchRecipeDemo(){
        Map<String, ArrayList> randomRecipeMap = new HashMap<>();
        ArrayList arr = new ArrayList<>();
        JSONObject obj = new JSONObject();

        for (int i = 0; i < 30; i++) {
            RecommendRecipeDto recipeDto = recommendRecipeService.randomRecipe();
            arr.add(recipeDto);
        }
        randomRecipeMap.put("recipe", arr);
        obj.put("recipe", randomRecipeMap);
        obj.put("status", 200);

        //randomRecipeMap.put("status", 200);
        return obj;
    }

}
