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

import java.util.HashMap;
import java.util.List;

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
    public void getid(@RequestParam List<Long> id){
        String[] array = null;
        System.out.println(id);
        for (int i = 0; i<id.size();i++){
            System.out.println(id.get(i));
        }
    }




    public String getEmail() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return email;
    }
}
