package com.hsbug.backend.admin_page.recipe.recipe_ratings;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeRatingService {
    private final RecipeRatingRepository recipeRatingRepository;

    public float ratingAverage(Long recipeId) {
        float total = 0;
        List<RecipeRatingsEntity> recipeRatings = recipeRatingRepository.findAllByRecipeId(recipeId);
        for (RecipeRatingsEntity recipeRating:recipeRatings) {
            total += recipeRating.getStarPoint();
        }
        return total / recipeRatings.size();
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
