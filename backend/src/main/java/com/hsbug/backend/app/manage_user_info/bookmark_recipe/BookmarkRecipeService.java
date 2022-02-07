package com.hsbug.backend.app.manage_user_info.bookmark_recipe;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

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

    public void saveRecipe(BookmarkRecipeDto bookmarkRecipeDto){
            bookmarkRecipeRepository.save(bookmarkRecipeDto.toEntity());
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

    public void deleteBookmark(String email,Long id) {
        BookmarkRecipeEntity bookmarkRecipeEntity = bookmarkRecipeRepository.findByEmail(email);
        BookmarkRecipeDto bookmarkRecipeDto = this.convertEntityToDto(bookmarkRecipeEntity);

        List<Long> bookmarkList = bookmarkRecipeDto.getRecipe_id();
        bookmarkList.remove(id);

        bookmarkRecipeDto.setRecipe_id(bookmarkList);
        this.saveRecipe(bookmarkRecipeDto);
    }
}
