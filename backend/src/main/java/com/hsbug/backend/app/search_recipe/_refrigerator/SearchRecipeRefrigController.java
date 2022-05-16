package com.hsbug.backend.app.search_recipe._refrigerator;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeService;
import com.hsbug.backend.app.refrigerator.manage_product.ManageProductDto;
import com.hsbug.backend.app.refrigerator.manage_product.ManageProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/user/search")
@RequiredArgsConstructor
public class SearchRecipeRefrigController {

    private final SearchRecipeRefrigService searchRecipeRefrigService;
    private final ManageProductService manageProductService;
    private final ManageRecipeService manageRecipeService;

    @GetMapping("/myRefrig")
    public JSONObject searchAaa() {
        String email = getEmail();
        JSONObject obj = new JSONObject();
        List<ManageProductDto> productDtoList = manageProductService.findProduct(email);
        obj.put("message", "read완료");
        for (int i = 0; i < productDtoList.size(); i++) {
            obj.put((i + 1), productDtoList.get(i));
        }
        obj.put("status", 200);
        return obj;
    }

    @GetMapping("/myRefrig/selectProduct")
    public JSONObject searchFromList(@RequestParam List<String> food) {
        String email = getEmail();
        JSONObject obj = new JSONObject();
        ArrayList<String> product_list = (ArrayList<String>) food;
/*
        List<ManageProductDto> productDtoList = manageProductService.findProduct(email);
        System.out.println(productDtoList);

        for (int i = 0; i < id.size(); i++) {
            for (int j = 0; j < productDtoList.size(); j++) {
                if (id.get(i) == productDtoList.get(j).getId()) {
                    product_list.add(productDtoList.get(j).getItemName());
                }
            }
        }*/
        System.out.println("findrecipefromrefrig");
        ArrayList productList = searchRecipeRefrigService.findRecipeFromRefrig(product_list);

        Map<Long, Integer> map;
        System.out.println("findproductfromrefrig");
        map = searchRecipeRefrigService.findProductFromRefrig(productList);

        ArrayList<Long> list = new ArrayList<>(map.keySet());
        //현재 리스트에 id 값만 들어있는 상황임 이것을 바꿔야함 엔티티로
        obj.put("searchResult", searchRecipeRefrigService.recipeIdToDto(list));
        //return this.ValueSortRecipe(map);
        return obj;
    }

    @GetMapping("/camera")
    public JSONObject searchFromCamera(@RequestParam List<String> food){
        String email = getEmail();
        JSONObject obj = new JSONObject();
        ArrayList f = (ArrayList) food;
        System.out.println(food);
        System.out.println(f);
        ArrayList productList = searchRecipeRefrigService.findRecipeFromRefrig(f);

        Map<Long, Integer> map;
        System.out.println("???");
        map = searchRecipeRefrigService.findProductFromRefrig(productList);

        ArrayList<Long> list = new ArrayList<>(map.keySet());
        obj.put("searchResult", searchRecipeRefrigService.recipeIdToDto(list));
        obj.put("status",200);
        return obj;
    }



    // 관련 = 오름차순, 조회수 get 오름차순,
    public Map<Long, Integer> ValueSortRecipe(Map<Long, Integer> map) {   // 레시피 내림차순
        List<Map.Entry<Long, Integer>> entryList = new ArrayList<>(map.entrySet());
        Map<Long, Integer> sorted_map = new LinkedHashMap<>();
        Collections.sort(entryList, (o1, o2) -> o2.getValue().compareTo(o1.getValue()));
        for (int i = 0; i < entryList.size(); i++) {
            sorted_map.put(entryList.get(i).getKey(), entryList.get(i).getValue());
        }
        return sorted_map;
    }

    public String getEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
