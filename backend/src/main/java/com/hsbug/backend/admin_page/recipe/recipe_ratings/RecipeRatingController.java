package com.hsbug.backend.admin_page.recipe.recipe_ratings;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
@RequestMapping("/user/rating")
@RequiredArgsConstructor
public class RecipeRatingController {
    private final RecipeRatingService recipeRatingService;

    @PostMapping("/add")
    public HttpStatus addRating(@RequestBody RecipeRatingDto dto) {
        log.info("recipe_id = {}", dto.getRecipeId());
        recipeRatingService.saveRating(dto.toEntity());
        recipeRatingService.ratingAverage(dto.getRecipeId());
        return HttpStatus.OK;
    }
}
