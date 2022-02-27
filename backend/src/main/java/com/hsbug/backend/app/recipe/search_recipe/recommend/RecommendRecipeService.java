package com.hsbug.backend.app.recipe.search_recipe.recommend;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class RecommendRecipeService {
    private final ManageRecipeRepository manageRecipeRepository;

    public RecommendRecipeDto randomRecipe() {

        Long randomNum = (long) makeRandomId();
        Optional<ManageRecipeEntity> recommendRecipeDto  = manageRecipeRepository.findById(randomNum);

        RecommendRecipeDto recipeDto = RecommendRecipeDto.builder()
                .RCP_ID(recommendRecipeDto.get().getId())
                .ATT_FILE_NO_MAIN(recommendRecipeDto.get().getATT_FILE_NO_MAIN())
                .RCP_NM(recommendRecipeDto.get().getRCP_NM())
                .build();

        return recipeDto;
    }

    private int makeRandomId() {
        int rNum = 0;
        Random random = new Random();
        rNum = random.nextInt(1300) + 1;
        return rNum;
    }

}
