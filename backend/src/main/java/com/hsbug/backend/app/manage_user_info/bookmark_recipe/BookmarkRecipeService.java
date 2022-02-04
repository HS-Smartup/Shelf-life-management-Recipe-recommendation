package com.hsbug.backend.app.manage_user_info.bookmark_recipe;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkRecipeService {

    private final BookmarkRecipeRepository bookmarkRecipeRepository;

    private BookmarkRecipeDto convertEntityToDto(BookmarkRecipeEntity bookmarkRecipeEntity){
        return BookmarkRecipeDto.builder()
                .id(bookmarkRecipeEntity.getId())
                .email(bookmarkRecipeEntity.getEmail())
                .recipe_id(bookmarkRecipeEntity.getRecipe_id())
                .build();
    }

    public JSONObject findRecipe(String email) {
        JSONObject obj = new JSONObject();
        try{
            BookmarkRecipeEntity bookmarkRecipeEntity = bookmarkRecipeRepository.findByEmail(email);
            BookmarkRecipeDto bookmarkRecipeDto = this.convertEntityToDto(bookmarkRecipeEntity);
            obj.put("리스트",bookmarkRecipeDto);
            return obj;
        } catch(Exception e){
            obj.put("message","아무 값이 음슴");
            return obj;
        }
    }
}
