package com.hsbug.backend.app.recipe.recipe_detail;

import com.hsbug.backend.app.manage_user_info.bookmark_recipe.BookmarkRecipeDto;
import com.hsbug.backend.app.manage_user_info.bookmark_recipe.BookmarkRecipeService;
import com.hsbug.backend.app.recipe.recently_viewed_recipes.RecentlyViewRecipeService;
import com.hsbug.backend.app.search_recipe._refrigerator.SearchRecipeRefrigDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/recipe")
public class RecipeDetailController {
    private final RecipeService recipeService;
    private final RecentlyViewRecipeService recentlyViewRecipeService;
    private final BookmarkRecipeService bookmarkRecipeService;

    @GetMapping("/detail")
    public JSONObject recipeDetail(@RequestParam Long id, Boolean book_check) {
        System.out.println(id);
        System.out.println(book_check);
        String email = this.findEmail();
        BookmarkRecipeDto bookmarkRecipeDto = bookmarkRecipeService.getUserBookmark(email);
        List<Long> id_list = bookmarkRecipeDto.getRecipe_id();
        Boolean check = false;
        if (id_list.contains(id)){
            check = true;
        }else{
            check = false;
        }
        JSONObject obj = new JSONObject();
        if (book_check = false) {
            recipeService.recipeCount(id);
        }
        recentlyViewRecipeService.addRecentlyViewRecipe(id);
        obj.put("recipe_detail", recipeService.findDetail(id));
        obj.put("like", check);
        obj.put("status", 200);
        return obj;
    }

    @GetMapping("/search/category")
    public List<SearchRecipeRefrigDto> categoryList(@RequestParam String category) {
        return recipeService.findCategoryRecipe(category);
    }

    @GetMapping("/popular/recipe")
    public Map<String, List<SearchRecipeRefrigDto>> popularRecipe() {
        Map<String, List<SearchRecipeRefrigDto>> map = new HashMap<>();
        List<SearchRecipeRefrigDto> dtoList = recipeService.mostViewRecipe();
        map.put("popularRecipeList", dtoList);
        return map;
    }
    private String findEmail() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return email;
    }

}
