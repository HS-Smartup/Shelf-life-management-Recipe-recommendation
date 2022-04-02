package com.hsbug.backend.admin_page.recipe.recipe;

import lombok.RequiredArgsConstructor;
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
    public RecipeJsonDTO recipeDetail(@RequestParam Long id) {
        recipeService.recipeCount(id);
        return recipeService.findDetail(id);
    }
}
