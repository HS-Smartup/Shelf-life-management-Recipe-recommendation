package com.hsbug.backend.app.recipe.recently_viewed_recipes;

import com.hsbug.backend.app.search_recipe._refrigerator.SearchRecipeRefrigDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class RecentlyViewRecipeController {
    private final RecentlyViewRecipeService recentlyViewRecipeService;

    @GetMapping("/recently/recipe")
    private JSONObject recentlyViewRecipe() {
        JSONObject obj = new JSONObject();
        List<RecentlyViewRecipeDto> dtoList = recentlyViewRecipeService.findRecentlyViewRecipe();
        if (dtoList.isEmpty()) {
            obj.put("status", 201);
            obj.put("message", "최근에 본 레시피가 없습니다.");
        } else {
            obj.put("status", 200);
            obj.put("recipe", dtoList);
        }
        return obj;
    }

}
