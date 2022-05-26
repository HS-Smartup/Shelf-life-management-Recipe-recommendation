package com.hsbug.backend.app.search_recipe.recommend;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    @GetMapping("like")
    public Map<String, List<RecommendRecipeDto>> likeRecommend() {
        Map<String, List<RecommendRecipeDto>> map = new HashMap<>();
        List<RecommendRecipeDto> recipeDtos = recommendRecipeService.recommendSystem(getEmail());
        map.put("recommendRecipe", recipeDtos);
        return map;
    }

    @GetMapping("makeId")
    public int[] test() {
        List<Long> list = new ArrayList<>();
        list.add(7L);
        list.add(11L);
        list.add(4L);
        list.add(5L);
        list.add(3L);
        return recommendRecipeService.makeRandomId(list);
    }
    public String getEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

}
