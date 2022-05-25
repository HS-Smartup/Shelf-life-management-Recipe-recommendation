package com.hsbug.backend.app.manage_user_info.bookmark_recipe;

import com.hsbug.backend.app.recipe.recipe_detail.RecipeEntity;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeJsonDTO;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeRepository;
import com.hsbug.backend.app.search_recipe.recommend.RecommendRecipeDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookmarkRecipeService {

    private final BookmarkRecipeRepository bookmarkRecipeRepository;
    private final RecipeRepository recipeRepository;

    public BookmarkRecipeDto convertEntityToDto(BookmarkRecipeEntity bookmarkRecipeEntity){
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
        ArrayList arr = new ArrayList();
        try{
            BookmarkRecipeEntity bookmarkRecipeEntity = bookmarkRecipeRepository.findByEmail(email);
            for (int i =0; i<bookmarkRecipeEntity.getRecipe_id().size();i++) {
                Long id = bookmarkRecipeEntity.getRecipe_id().get(i);
                System.out.println(id);
                Optional<RecipeEntity> recipeEntity = recipeRepository.findById(id);
                JSONObject recipe = new JSONObject();

                recipe.put("id",recipeEntity.get().getId());
                recipe.put("recipeName",recipeEntity.get().getRecipeName());
                recipe.put("recipeMainImage",recipeEntity.get().getRecipeMainImage());
                recipe.put("recipeWriter",recipeEntity.get().getRecipeWriter());
                recipe.put("recipeViews",recipeEntity.get().getRecipeViews());
                arr.add(recipe);
            }
            System.out.println(arr);

            obj.put("recipe",arr);
            obj.put("status",200);
            return obj;
        } catch(Exception e){
            obj.put("message","삭제할 데이터가 없습니다.");
            obj.put("status",200);
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
