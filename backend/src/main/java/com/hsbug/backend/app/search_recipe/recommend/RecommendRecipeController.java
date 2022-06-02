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
        Map<String, List> randomRecipeMap = new HashMap<>();
        List<RecommendRecipeDto> arr = new ArrayList<>();
        JSONObject obj = new JSONObject();
        List<Long> intList = new ArrayList<>();
        //서비스에서 다 처리하는쪽으로 다 넘겨버림
        arr.addAll(recommendRecipeService.randomRecipe(intList));
        randomRecipeMap.put("recipe", arr);
        obj.put("recipe", randomRecipeMap);
        obj.put("status", 200);
        System.out.println("=================="+intList);
        for (RecommendRecipeDto recipeDto : arr) {
            System.out.println("recipeDto = " + recipeDto);
        }
        //randomRecipeMap.put("status", 200);
        return obj;
    }

    @GetMapping("like")
    public JSONObject likeRecommend() {
        Map<String, List<RecommendRecipeDto>> map = new HashMap<>();
        JSONObject obj = new JSONObject();
        List<RecommendRecipeDto> recipeDtos = recommendRecipeService.recommendSystem(getEmail());
        map.put("recipe", recipeDtos);
        obj.put("recipe",map);
        obj.put("status",200);
        return obj;
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
