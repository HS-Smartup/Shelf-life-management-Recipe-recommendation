package com.hsbug.backend.admin_page.recipe.recipe_ratings;

import com.hsbug.backend.admin_page.recipe.recipe.RecipeEntity;
import com.hsbug.backend.admin_page.recipe.recipe.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeRatingService {
    private final RecipeRatingRepository recipeRatingRepository;
    private final RecipeRepository recipeRepository;

    @Transactional
    public void ratingAverage(Long recipeId) {
        float total = 0;
        List<RecipeRatingsEntity> recipeRatings = recipeRatingRepository.findAllByRecipeId(recipeId);
        for (RecipeRatingsEntity recipeRating:recipeRatings) {
            total += recipeRating.getStarPoint();
        }
        float starPoint = (float) (Math.round((total / recipeRatings.size())*10)/10.0);
        RecipeEntity recipe = recipeRepository.findById(recipeId).get();
        recipe.setRecipeStar(starPoint);
        recipe.setRecipeRatingCount(recipeRatings.size());
    }

    public void saveRating(RecipeRatingsEntity recipeRatingsEntity) {
        recipeRatingRepository.save(recipeRatingsEntity);
    }

    @Transactional
    public void editRating(RecipeRatingDto dto) {
        RecipeRatingsEntity ratingEntity = recipeRatingRepository.findById(dto.getId()).get();
        ratingEntity.setStarPoint(dto.getStarPoint());
    }

}
