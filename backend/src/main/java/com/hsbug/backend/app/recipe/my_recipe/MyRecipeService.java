package com.hsbug.backend.app.recipe.my_recipe;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeRepository;
import com.hsbug.backend.app.manage_user_info.bookmark_recipe.BookmarkRecipeDto;
import com.hsbug.backend.app.manage_user_info.bookmark_recipe.BookmarkRecipeEntity;
import com.hsbug.backend.app.manage_user_info.bookmark_recipe.BookmarkRecipeRepository;
import com.hsbug.backend.app.manage_user_info.bookmark_recipe.BookmarkRecipeService;
import com.hsbug.backend.app.recipe.recently_viewed_recipes.RecentlyViewRecipeRepository;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeEntity;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeRepository;
import com.hsbug.backend.app.recipe.recipe_detail.recipeStep.RecipeStepRepository;
import com.hsbug.backend.app.recipe.recipe_detail.recipe_attribute.RecipeIngredientsRepository;
import com.hsbug.backend.app.recipe.recipe_ratings.RecipeRatingRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.UnexpectedRollbackException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyRecipeService {

    private final ManageRecipeRepository manageRecipeRepository;
    private final RecipeRepository recipeRepository;
    private final RecipeStepRepository recipeStepRepository;
    private final RecipeIngredientsRepository recipeIngredientsRepository;
    private final BookmarkRecipeRepository bookmarkRecipeRepository;
    private final RecentlyViewRecipeRepository recentlyViewRecipeRepository;
    private final BookmarkRecipeService bookmarkRecipeService;
    private final RecipeRatingRepository recipeRatingRepository;

    @Transactional
    public void saveRecipe(ManageRecipeDto manageRecipeDto){
        manageRecipeRepository.save(manageRecipeDto.toEntity());
    }

    public List<RecipeEntity> readRecipe(String email){
        //List<RecipeEntity> myRecipe = recipeRepository.findAllByRecipeWriter(email);
        List<RecipeEntity> myRecipe = recipeRepository.findAllByRecipeEmailOrderByIdDesc(email);
        return myRecipe;
    }

    @Transactional
    public JSONObject deleteRecipe(Long id, String email) throws UnexpectedRollbackException {
        JSONObject obj = new JSONObject();
        BookmarkRecipeEntity bookmark = bookmarkRecipeRepository.findByEmail(email);
        try {
            if (bookmark.getRecipe_id().contains(id)) {
                List bookmark_list = bookmark.getRecipe_id();
                BookmarkRecipeDto bookmarkRecipeDto = bookmarkRecipeService.convertEntityToDto(bookmark);
                bookmark_list.remove(id);
                System.out.println(bookmark_list);
                bookmarkRecipeDto.setRecipe_id(bookmark_list);
                bookmarkRecipeRepository.save(bookmarkRecipeDto.toEntity());
                System.out.println("북마크 삭제 완료");
            }
        }finally {
            System.out.println("1");
            recentlyViewRecipeRepository.deleteByRecipeIdAndAndUserEmail(id, email);
            System.out.println("최근 본 레시피 삭제 완료");
            recipeStepRepository.deleteAllByRecipeEntityId(id);
            System.out.println("레시피 순서 삭제 완료");
            recipeIngredientsRepository.deleteAllByRecipeEntityIdId(id);
            System.out.println("레시피 재료 삭제 완료");
            recipeRatingRepository.deleteAllByRecipeId(id);
            System.out.println("레시피 평점 부여 삭제");
            recipeRepository.deleteById(id);
            System.out.println("레시피 본체 삭제 완료");
            obj.put("message", id + " 삭제 완료");
            obj.put("status", 200);
            return obj;
        }
    }
}

