package com.hsbug.backend.app.recipe.search_recipe.recommend;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/user/recommend")
@RequiredArgsConstructor
@Slf4j
public class RecommendRecipeController {

    private final RecommendRecipeService recommendRecipeService;

    @GetMapping("/random")
    @ResponseBody
    public List<RecommendRecipeDto> searchRecipeDemo(){

        List<RecommendRecipeDto> randomRecipe = new ArrayList<>();
        for (int i = 0; i < 30; i++) {
            RecommendRecipeDto recipeDto = recommendRecipeService.randomRecipe();
            randomRecipe.add(recipeDto);
        }
        log.info("randomRecipe = {}", randomRecipe);

        return randomRecipe;
    }

}
