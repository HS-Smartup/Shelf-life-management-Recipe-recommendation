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
@RequestMapping("/user")
@RequiredArgsConstructor
public class SearchRecipeRefrigController {

    private final SearchRecipeRefrigService searchRecipeRefrigService;
    private final ManageProductService manageProductService;

    @GetMapping("/search/myRefrig")
    public JSONObject searchAaa(){
        String email = getEmail();
        JSONObject obj = new JSONObject();
        List<ManageProductDto> productDtoList = manageProductService.findProduct(email);
        obj.put("message","read완료");
        for (int i = 0; i < productDtoList.size();i++){
            obj.put((i+1),productDtoList.get(i));
        }
        return obj;
    }

    @GetMapping("/search/myRefrig/getid")
    public Map<Long, Integer> getid(@RequestParam List<Long> id, boolean check) { //check는 선택 요소 포함 검색, 선택 요소 만으로 검색
        String email = getEmail();
        JSONObject obj = new JSONObject();
        ArrayList<String> product_list = new ArrayList<>();
        List<ManageProductDto> productDtoList = manageProductService.findProduct(email);

        for (int i = 0; i < id.size(); i++) {
            for (int j = 0; j < productDtoList.size(); j++) {
                if (id.get(i) == productDtoList.get(j).getId()) {
                    product_list.add(productDtoList.get(j).getProduct_name());
                }
            }
        }
        System.out.println(product_list);
        Map<Long, Integer> map;
        if (check) {
            map = searchRecipeRefrigService.findIdFromPart(product_list);
        }else {
            map = searchRecipeRefrigService.findIdFromAll(product_list);
            //sort 할 필요 없는데 map -> json obj 때문에
        }
        return this.ValueSort(map);
    }

    public String getEmail() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return email;
    }

    // 관련 = 오름차순, 조회수 get 오름차순,

    public Map<Long, Integer> ValueSort(Map<Long, Integer> map) {
        List<Entry<Long, Integer>> entryList = new ArrayList<>(map.entrySet());
        Map<Long, Integer> sorted_map = new LinkedHashMap<>();
        Collections.sort(entryList, new Comparator<Entry<Long, Integer>>() {
            public int compare(Entry<Long, Integer> o1, Entry<Long, Integer> o2) {
                return o2.getValue().compareTo(o1.getValue());
            }
        });
        for(int i = 0; i<entryList.size(); i++){
            sorted_map.put(entryList.get(i).getKey(), entryList.get(i).getValue());
        }

    return sorted_map;
    }
}
