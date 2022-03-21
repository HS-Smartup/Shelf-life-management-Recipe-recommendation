package com.hsbug.backend.app.recipe.search_recipe._refrigerator;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeService;
import com.hsbug.backend.app.refrigerator.manage_product.ManageProductDto;
import com.hsbug.backend.app.refrigerator.manage_product.ManageProductService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/user/search")
@RequiredArgsConstructor
public class SearchRecipeRefrigController {

    private final SearchRecipeRefrigService searchRecipeRefrigService;
    private final ManageProductService manageProductService;
    private final ManageRecipeService manageRecipeService;
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
    public JSONObject searchFromSelectProduct(@RequestParam List<Long> id) { //check는 선택 요소 포함 검색, 선택 요소 만으로 검색
        String email = getEmail();
        ArrayList<String> product_list = new ArrayList<>();
        List<ManageProductDto> productDtoList = manageProductService.findProduct(email);
        int searchResultCount = 30;
        ArrayList<ManageRecipeDto> returnSearchResultList = new ArrayList<>();
        JSONObject obj = new JSONObject();

        for (int i = 0; i < id.size(); i++) {
            for (int j = 0; j < productDtoList.size(); j++) {
                if (id.get(i) == productDtoList.get(j).getId()) {
                    product_list.add(productDtoList.get(j).getItemName());
                }
            }
        }
        System.out.println(product_list);
//        map = searchRecipeRefrigService.findIdFromPart(product_list);
        Map<Long, Integer> searchResultMap = searchRecipeRefrigService.findIdFromAll(product_list);
//        searchResultMap.forEach((key, valu) -> manageRecipeService.findById(key));
        Iterator<Long> keys = searchResultMap.keySet().iterator();
        while (keys.hasNext()) {
            Long key = keys.next();
            ManageRecipeDto recipeDto = manageRecipeService.findById(key);
            returnSearchResultList.add(recipeDto);
            searchResultCount--;
            if (searchResultCount==0)
                break;
        }
        obj.put("return",returnSearchResultList);
        return obj;
    }

    public String getEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

}
