package com.hsbug.backend.app.recipe.search_recipe._refrigerator;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeRepository;
import com.hsbug.backend.app.manage_user_info.my_recipe.MyRecipeService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SearchRecipeRefrigService {

    private final ManageRecipeRepository manageRecipeRepository;
    private final MyRecipeService myRecipeService;

    public Map<Long, Integer> findIdFromPart(ArrayList product_list){
        HashMap<Long,Integer> map = new HashMap<>();
        for (int i = 0; i < product_list.size(); i++) {
            String product = product_list.get(i).toString();
            System.out.println(product);

            List<ManageRecipeEntity> manageRecipeEntityList = manageRecipeRepository.findByRCPPARTSDTLSContains(product);
            List<ManageRecipeDto> manageRecipeDtoList = new ArrayList<>();

            for (ManageRecipeEntity manageRecipeEntity : manageRecipeEntityList){
                manageRecipeDtoList.add(this.myRecipeService.convertEntityToDto(manageRecipeEntity));
            }

            for (int j = 0; j < manageRecipeDtoList.size(); j++){
                if(!map.containsKey(manageRecipeDtoList.get(j).getRCP_ID())){
                    map.put(manageRecipeDtoList.get(j).getRCP_ID(),1);
                }else{
                    map.put(manageRecipeDtoList.get(j).getRCP_ID(),
                            map.get(manageRecipeDtoList.get(j).getRCP_ID())+1);
                }
            }
            System.out.println(map);
        }
        return map;
    }
    public Map<Long, Integer> findIdFromAll(ArrayList product_list) {
        HashMap<Long, Integer> map = new HashMap<>();
        HashMap<Long, Integer> choice_only_map = new HashMap<>();
        for (int i = 0; i < product_list.size(); i++) {
            String product = product_list.get(i).toString();
            System.out.println(product);

            List<ManageRecipeEntity> manageRecipeEntityList = manageRecipeRepository.findByRCPPARTSDTLSContains(product);
            List<ManageRecipeDto> manageRecipeDtoList = new ArrayList<>();

            for (ManageRecipeEntity manageRecipeEntity : manageRecipeEntityList) {
                manageRecipeDtoList.add(this.myRecipeService.convertEntityToDto(manageRecipeEntity));
            }

            for (int j = 0; j < manageRecipeDtoList.size(); j++) {
                if (!map.containsKey(manageRecipeDtoList.get(j).getRCP_ID())) {
                    map.put(manageRecipeDtoList.get(j).getRCP_ID(), 1);
                } else {
                    map.put(manageRecipeDtoList.get(j).getRCP_ID(),
                            map.get(manageRecipeDtoList.get(j).getRCP_ID()) + 1);
                }
            }
        }
        for (Map.Entry<Long,Integer> entry : map.entrySet()){
            if (entry.getValue() == product_list.size()){
                choice_only_map.put(entry.getKey(), product_list.size());
            }
        }
        return choice_only_map;
    }

}
