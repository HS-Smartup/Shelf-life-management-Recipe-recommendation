package com.hsbug.backend.app.search_recipe._refrigerator;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeRepository;
import com.hsbug.backend.app.recipe.my_recipe.MyRecipeService;
import com.hsbug.backend.app.recipe.recipe_detail.recipe_attribute.RecipeIngredients;
import com.hsbug.backend.app.recipe.recipe_detail.recipe_attribute.RecipeIngredientsCheckDto;
import com.hsbug.backend.app.recipe.recipe_detail.recipe_attribute.RecipeIngredientsDTO;
import com.hsbug.backend.app.recipe.recipe_detail.recipe_attribute.RecipeIngredientsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SearchRecipeRefrigService {
    private final ManageRecipeRepository manageRecipeRepository;
    private final MyRecipeService myRecipeService;
    private final RecipeIngredientsRepository recipeIngredientsRepository;

    public Map<Long, Integer> findIdFromPart(ArrayList<String> product_list){
        return selectCounting(product_list);
    }

    public Map<Long, Integer> findIdFromAll(ArrayList<String> product_list) {
        HashMap<Long, Integer> idCountMap = selectCounting(product_list);
        HashMap<Long, Integer> choice_only_map = new HashMap<>();

        //가장 많이 포함하고 있는 순서대로 choice_only_map에 넣기 위함
        for (Map.Entry<Long,Integer> entry : idCountMap.entrySet()){
            for (int i = 0; i < product_list.size(); i++) {
                if (entry.getValue() == product_list.size()-i){
                    choice_only_map.put(entry.getKey(), product_list.size()-i);
                }
            }
        }
        //sort 할 필요 없는데 map -> json obj 때문에
        return mapValueSort(choice_only_map);
    }

    private HashMap<Long, Integer> selectCounting(ArrayList<String> product_list) {
        HashMap<Long, Integer> map = new HashMap<>();
        for ( Object product : product_list) {
            String productName = product.toString();

            List<RecipeIngredients> manageRecipeEntityList = recipeIngredientsRepository.findAllByIngredientNameContains(productName);
            List<RecipeIngredientsCheckDto> manageRecipeDtoList = new ArrayList<>();

            for (RecipeIngredients manageRecipeEntity : manageRecipeEntityList) {
                manageRecipeDtoList.add(this.ToDto(manageRecipeEntity));
            }

            for (RecipeIngredientsCheckDto manageRecipeDto : manageRecipeDtoList) {
                if (!map.containsKey(manageRecipeDto)) {
                    map.put(manageRecipeDto.getRecipeEntityId().getId(), 1);
                } else {
                    map.put(manageRecipeDto.getRecipeEntityId().getId(),
                            map.get(manageRecipeDto.getRecipeEntityId()) + 1);
                }
            }
        }
        return map;
    }

    public Map<Long, Integer> findProductFromRefrig(ArrayList product_list) {
        HashMap<Long, Integer> map = new HashMap<>();
        for (int i = 0; i < product_list.size(); i++) {
            String product = product_list.get(i).toString();

            //List<ManageRecipeEntity> manageRecipeEntityList = manageRecipeRepository.findByRCPPARTSDTLSContains(product);
            List<RecipeIngredients> manageRecipeEntityList = recipeIngredientsRepository.findAllByIngredientNameContains(product);
            List<RecipeIngredientsCheckDto> manageRecipeDtoList = new ArrayList<>();

            for (RecipeIngredients manageRecipeEntity : manageRecipeEntityList) {
                manageRecipeDtoList.add(this.ToDto(manageRecipeEntity));
            }

            for (int j = 0; j < manageRecipeDtoList.size(); j++) {
                if (!map.containsKey(manageRecipeDtoList.get(j).getRecipeEntityId())) {
                    map.put(manageRecipeDtoList.get(j).getRecipeEntityId().getId(), 1);
                } else {
                    map.put(manageRecipeDtoList.get(j).getRecipeEntityId().getId(),
                            map.get(manageRecipeDtoList.get(j).getRecipeEntityId()) + 1);
                }
            }
        }
        return map;
    }

    public RecipeIngredientsCheckDto ToDto(RecipeIngredients recipeIngredients){
        RecipeIngredientsCheckDto recipeIngredientsCheckDto = recipeIngredients.EntitytoDto();
        return recipeIngredientsCheckDto;
    }

    public RecipeIngredientsDTO convertEntityToDto(RecipeIngredients recipeIngredients){
        RecipeIngredientsDTO recipeIngredientsDTO = recipeIngredients.toDto();
        return recipeIngredientsDTO;
    }

    public ArrayList findRecipeFromRefrig(ArrayList<String> refrigList) {
        ArrayList productList = new ArrayList<>();
        for (int i = 0; i < refrigList.size(); i++) {    // 냉장고에서 aa, bb, cc 가져옴
            HashMap<String, Integer> map = new HashMap<>();
            String keyword_all = refrigList.get(i);
            String[] keyword_slice = refrigList.get(i).split(" ");
            String[] keyword = refrigList.get(i).replace(" ", "").split("");
            if (!recipeIngredientsRepository.findByIngredientName(keyword_all).isEmpty()) {  // 키워드 재료테이블과 일치하는지 확인
                productList.add(keyword_all);
            } else {
                for (int j = 0; j < keyword.length; j++) {               // 대, 파       양, 파       고, 구, 마  for문 돌아줌
                    List<RecipeIngredients> ingredientsList = recipeIngredientsRepository.findAllByIngredientNameContains(keyword[j]);
                    List<RecipeIngredientsDTO> ingredientsDtoList = new ArrayList<>();

                    for (RecipeIngredients crawlingEntity : ingredientsList) {  // entity to dto
                        ingredientsDtoList.add(this.convertEntityToDto(crawlingEntity));
                    }

                    for (int k = 0; k < ingredientsDtoList.size(); k++) {          // 레시피 관련도 점수 부여
                        if (!map.containsKey(ingredientsDtoList.get(k).getIngredientName())) {
                            map.put(ingredientsDtoList.get(k).getIngredientName(), 1);
                        } else {
                            map.put(ingredientsDtoList.get(k).getIngredientName(), map.get(ingredientsDtoList.get(k).getIngredientName()) + 1);
                        }
                    }
                }
                for (int l = 0; l < keyword_slice.length; l++) {               // 맛있는, 돼지고기, 삼겹살  for문 돌아줌
                    List<RecipeIngredients> ingredientsList = recipeIngredientsRepository.findAllByIngredientNameContains(keyword_slice[l]);
                    List<RecipeIngredientsDTO> ingredientsDtoList = new ArrayList<>();

                    for (RecipeIngredients crawlingEntity : ingredientsList) {
                        ingredientsDtoList.add(this.convertEntityToDto(crawlingEntity));

                    }
                    for (int m = 0; m < ingredientsDtoList.size(); m++) {          // 레시피 관련도 점수 부여
                        if (!map.containsKey(ingredientsDtoList.get(m).getIngredientName())) {
                            map.put(ingredientsDtoList.get(m).getIngredientName(), 1);
                        } else {
                            map.put(ingredientsDtoList.get(m).getIngredientName(), map.get(ingredientsDtoList.get(m).getIngredientName()) + 1);
                        }
                    }
                    System.out.println(map);
                }
                Integer maxValue = Collections.max(map.values());
                for (Map.Entry<String, Integer> entry : map.entrySet()) {
                    if (entry.getValue() == maxValue) {
                        productList.add(entry.getKey());
                    }
                }
            }
            System.out.println(productList);
        }
        return productList;
    }

    // 관련 = 오름차순, 조회수 get 오름차순,
    public Map<Long, Integer> mapValueSort(Map<Long, Integer> map) {
        List<Map.Entry<Long, Integer>> entryList = new ArrayList<>(map.entrySet());
        Map<Long, Integer> sorted_map = new LinkedHashMap<>();
        Collections.sort(entryList, (o1, o2) -> o2.getValue().compareTo(o1.getValue()));
        for(int i = 0; i<entryList.size(); i++){
            sorted_map.put(entryList.get(i).getKey(), entryList.get(i).getValue());
        }

        return sorted_map;
    }
}
