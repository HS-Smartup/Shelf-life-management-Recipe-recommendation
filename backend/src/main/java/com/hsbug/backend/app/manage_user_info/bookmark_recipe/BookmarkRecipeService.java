package com.hsbug.backend.app.manage_user_info.bookmark_recipe;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookmarkRecipeService {

    private final BookmarkRecipeRepository bookmarkRecipeRepository;
    private final ManageRecipeRepository manageRecipeRepository;

    private BookmarkRecipeDto convertEntityToDto(BookmarkRecipeEntity bookmarkRecipeEntity){
        return BookmarkRecipeDto.builder()
                .id(bookmarkRecipeEntity.getId())
                .email(bookmarkRecipeEntity.getEmail())
                .recipe_id(bookmarkRecipeEntity.getRecipe_id())
                .build();
    }

    public void saveRecipe(Long id,BookmarkRecipeDto bookmarkRecipeDto) {
        Optional<BookmarkRecipeEntity> optionalBookmark = bookmarkRecipeRepository.findById(id);
        if(!optionalBookmark.isPresent()) {
            bookmarkRecipeRepository.save(bookmarkRecipeDto.toEntity());
        } else{
            BookmarkRecipeEntity bookmark = optionalBookmark.get();
            bookmarkRecipeDto.setId(bookmark.getId());
            bookmarkRecipeRepository.save(bookmarkRecipeDto.toEntity());
        }
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

    public BookmarkRecipeDto getUserBookmark(String email){

        try {
            BookmarkRecipeEntity bookmarkRecipeEntity = bookmarkRecipeRepository.findByEmail(email);
            BookmarkRecipeDto bookmarkRecipeDto = this.convertEntityToDto(bookmarkRecipeEntity);
            return bookmarkRecipeDto;
        } catch(Exception e){
            return null;
        }
    }
}
