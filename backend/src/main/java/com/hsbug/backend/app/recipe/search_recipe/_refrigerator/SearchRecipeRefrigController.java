package com.hsbug.backend.app.recipe.search_recipe._refrigerator;

import com.hsbug.backend.app.refrigerator.manage_product.ManageProductDto;
import com.hsbug.backend.app.refrigerator.manage_product.ManageProductService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.*;
import java.util.Map.Entry;
@RestController
@RequestMapping("/user/search")
@RequiredArgsConstructor
public class SearchRecipeRefrigController {

    private final SearchRecipeRefrigService searchRecipeRefrigService;
    private final ManageProductService manageProductService;

    @GetMapping("/myRefrig")
    public JSONObject searchAaa(){
        String email = getEmail();
        JSONObject obj = new JSONObject();
        List<ManageProductDto> productDtoList = manageProductService.findProduct(email);
        obj.put("message","read완료");
        for (int i = 0; i < productDtoList.size();i++){
            obj.put((i+1),productDtoList.get(i));
        }
        obj.put("status",200);
        return obj;
    }

    @GetMapping("/myRefrig/selectProduct")
    public JSONObject searchFromList(@RequestParam List<Long> id, boolean check){
        String email = getEmail();
        ArrayList<String> product_list = new ArrayList<>();
        List<ManageProductDto> productDtoList = manageProductService.findProduct(email);
        System.out.println(productDtoList);

        for (int i = 0; i < id.size(); i++) {
            for (int j = 0; j < productDtoList.size(); j++) {
                if (id.get(i) == productDtoList.get(j).getId()) {
                    product_list.add(productDtoList.get(j).getProduct_name());
                }
            }
        }
        System.out.println(product_list);
        JSONObject obj = searchRecipeRefrigService.findProduct(product_list);
        return obj;
        //this.searchFromSelectProduct(product_list, check); 뒤에 이거 주석 풀기
    }

    public Map<Long, Integer> searchFromSelectProduct(ArrayList<String> product_list, boolean check) { //check는 선택 요소 포함 검색, 선택 요소 만으로 검색
        Map<Long, Integer> map;
        if (check) {
            map = searchRecipeRefrigService.findIdFromPart(product_list);
        }else {
            map = searchRecipeRefrigService.findIdFromAll(product_list);
            //sort 할 필요 없는데 map -> json obj 때문에
        }
        return this.ValueSortRecipe(map);
    }


    public String getEmail() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return email;
    }

    // 관련 = 오름차순, 조회수 get 오름차순,

    public Map<Long, Integer> ValueSortRecipe(Map<Long, Integer> map) {   // 레시피 내림차순
        List<Entry<Long, Integer>> entryList = new ArrayList<>(map.entrySet());
        Map<Long, Integer> sorted_map = new LinkedHashMap<>();
        Collections.sort(entryList, (o1, o2) -> o2.getValue().compareTo(o1.getValue()));
        for(int i = 0; i<entryList.size(); i++){
            sorted_map.put(entryList.get(i).getKey(), entryList.get(i).getValue());
        }

    return sorted_map;
    }
}
