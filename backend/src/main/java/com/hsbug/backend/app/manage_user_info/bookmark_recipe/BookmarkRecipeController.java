package com.hsbug.backend.app.manage_user_info.bookmark_recipe;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/bookmark")
@RequiredArgsConstructor
public class BookmarkRecipeController {

    private final BookmarkRecipeService bookmarkRecipeService;

    @PostMapping("/addBookmark")
    public JSONObject addBookmark(@RequestBody Long id){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(id);
        BookmarkRecipeDto bookmarkRecipeDto = bookmarkRecipeService.getUserBookmark(email);
        List<Long> recipeList= bookmarkRecipeDto.getRecipe_id();
        recipeList.add(id);
        bookmarkRecipeDto.setRecipe_id(recipeList);
        bookmarkRecipeService.saveRecipe(bookmarkRecipeDto.getId(),bookmarkRecipeDto);
        // 일단 db에서 read, list에 추가
        JSONObject obj = new JSONObject();

        return obj;
    }

    @GetMapping("/readBookmark")
    public JSONObject readBookmark(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return bookmarkRecipeService.findRecipe(email);
    }
}
