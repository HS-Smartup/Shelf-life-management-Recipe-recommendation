package com.hsbug.backend.app.recipe.recently_viewed_recipes;

import com.hsbug.backend.app.recipe.recipe_detail.RecipeEntity;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeRepository;
import com.hsbug.backend.app.search_recipe._refrigerator.SearchRecipeRefrigDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RecentlyViewRecipeService {

    private final RecentlyViewRecipeRepository recentlyViewRecipeRepository;
    private final RecipeRepository recipeRepository;

    public List<RecentlyViewRecipeDto> findRecentlyViewRecipe() {
        List<RecentlyViewRecipeDto> dtoList = new ArrayList<>();
        String userEmail = getEmail();
        List<RecentlyViewRecipe> recentlyViewRecipeList = recentlyViewRecipeRepository.findAllByUserEmailOrderByIdDesc(userEmail);
        for (RecentlyViewRecipe recipe: recentlyViewRecipeList) {
            RecipeEntity recipeEntity = recipeRepository.findById(recipe.getRecipeId()).get();
            dtoList.add(recipeEntity.toRecentlyViewRecipeDto());
        }
        return dtoList;
    }

    @Transactional
    public void addRecentlyViewRecipe(Long recipeId) {
        List<RecentlyViewRecipe> recentlyViewRecipeList = recentlyViewRecipeRepository.findAllByUserEmailOrderByIdDesc(getEmail());
        //중복제거
        for (RecentlyViewRecipe recipe : recentlyViewRecipeList) {
            if (recipe.getRecipeId().equals(recipeId)) {
                recentlyViewRecipeRepository.deleteById(recipe.getId());
            }
        }
        //사이즈를 30으로 항상 유지
        if (recentlyViewRecipeList.size() >= 30){
            RecentlyViewRecipe recentlyViewRecipe = recentlyViewRecipeList.get(recentlyViewRecipeList.size() - 1);
            recentlyViewRecipeRepository.deleteById(recentlyViewRecipe.getId());
        }
        //저장
        recentlyViewRecipeRepository.save(
                RecentlyViewRecipe.builder()
                        .recipeId(recipeId)
                        .userEmail(getEmail())
                        .build()
        );
    }

    public String getEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
