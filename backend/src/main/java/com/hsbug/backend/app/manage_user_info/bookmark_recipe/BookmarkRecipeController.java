package com.hsbug.backend.app.manage_user_info.bookmark_recipe;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class BookmarkRecipeController {

    private final BookmarkRecipeService bookmarkRecipeService;

    @GetMapping("/bookmark/read")
    public JSONObject readBookmark(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return bookmarkRecipeService.findRecipe(email);
    }
}
