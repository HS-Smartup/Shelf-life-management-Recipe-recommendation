package com.hsbug.backend.app.search_recipe.recipe_name;

import com.hsbug.backend.app.recipe.recipe_detail.RecipeEntity;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeRepository;
import com.hsbug.backend.app.search_recipe._refrigerator.SearchRecipeRefrigDto;
import com.hsbug.backend.app.search_recipe.recommend.RecommendRecipeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SearchRecipeNameService {
    private final RecipeRepository recipeRepository;

    public List<RecommendRecipeDto> searchRecipeName(String search) {
        List<RecommendRecipeDto> resultList = new ArrayList<>();
        List<RecipeEntity> recipeEntityList = new ArrayList<>();
        Map<RecipeEntity, Integer> map = new HashMap<>();

        String[] splitSpaceSearch = search.split(" ");  //공백기준 슬라이싱
        for (String str : splitSpaceSearch) {
            recipeEntityList.addAll(recipeRepository.findByRecipeNameContaining(str));
        }
        if (!recipeEntityList.isEmpty()) {
            for (RecipeEntity recipe: recipeEntityList) {
                if (!map.containsKey(recipe)) {
                    map.put(recipe, 1);
                } else {
                    map.put(recipe, map.get(recipe) + 3);
                }
            }
        }

        String[] splitAllSearch = search.replace(" ","").split(""); //모든 글자 슬라이싱
        for (String str : splitAllSearch) {
            System.out.println("str"+str);
            List<RecipeEntity> recipeEntities = recipeRepository.findByRecipeNameContaining(str);
            recipeEntityList.addAll(recipeEntities);
        }
        if (!recipeEntityList.isEmpty()) {
            for (RecipeEntity recipe: recipeEntityList) {
                System.out.println(map);
                if (!map.containsKey(recipe)) {
                    map.put(recipe, 1);
                } else {
                    map.put(recipe, map.get(recipe) + 1);
                }
            }
        }

        for (Map.Entry<RecipeEntity, Integer> entry : mapValueSort(map).entrySet()) {
            resultList.add(entry.getKey().toRecomendResultDto());
        }
        return resultList;
    }


    public Map<RecipeEntity, Integer> mapValueSort(Map<RecipeEntity, Integer> map) {
        List<Map.Entry<RecipeEntity, Integer>> entryList = new ArrayList<>(map.entrySet());
        Map<RecipeEntity, Integer> sorted_map = new LinkedHashMap<>();
        Collections.sort(entryList, (o1, o2) -> o2.getValue().compareTo(o1.getValue()));
        for(int i = 0; i<entryList.size(); i++){
            sorted_map.put(entryList.get(i).getKey(), entryList.get(i).getValue());
        }
        return sorted_map;
    }
}
