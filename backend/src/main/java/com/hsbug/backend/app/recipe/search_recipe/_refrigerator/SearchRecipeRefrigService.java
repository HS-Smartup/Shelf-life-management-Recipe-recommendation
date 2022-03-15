package com.hsbug.backend.app.recipe.search_recipe._refrigerator;

import com.hsbug.backend.admin_page.crawling.CrawlingDto;
import com.hsbug.backend.admin_page.crawling.CrawlingEntity;
import com.hsbug.backend.admin_page.crawling.CrawlingRepository;
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

import java.sql.Array;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SearchRecipeRefrigService {

    private final ManageRecipeRepository manageRecipeRepository;
    private final CrawlingRepository crawlingRepository;
    private final MyRecipeService myRecipeService;

    public Map<Long, Integer> findIdFromPart(ArrayList product_list) {
        HashMap<Long, Integer> map = new HashMap<>();
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
            System.out.println(map);
        }
        return map;
    }

    public Map<Long, Integer> findIdFromAll(ArrayList product_list) {
        HashMap<Long, Integer> map = new HashMap<>();
        HashMap<Long, Integer> choice_only_map = new HashMap<>();
        for (int i = 0; i < product_list.size(); i++) {
            String product = product_list.get(i).toString();
            //System.out.println(product);

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
        for (Map.Entry<Long, Integer> entry : map.entrySet()) {
            if (entry.getValue() == product_list.size()) {
                choice_only_map.put(entry.getKey(), product_list.size());
            }
        }
        return choice_only_map;
    }

    public CrawlingDto convertEntityToDto(CrawlingEntity crawlingEntity) {
        return CrawlingDto.builder()
                .id(crawlingEntity.getId())
                .menu(crawlingEntity.getMenu())
                .build();
    }

    public JSONObject findProduct(ArrayList<String> refrigList) {
        JSONObject obj = new JSONObject();
        for (int i = 0; i < refrigList.size(); i++) {           // 냉장고에서 대파, 양파, 고구마 가져옴
            HashMap<String, Integer> map = new HashMap<>();
            String[] keyword = refrigList.get(i).replace(" ","").split("");
            for (int j =0; j<keyword.length;j++) {               // 대, 파       양, 파       고, 구, 마  for문 돌아줌
                List<CrawlingEntity> crawlingEntityList = crawlingRepository.findByMenuContains(keyword[j]);
                List<CrawlingDto> crawlingDtoList = new ArrayList<>();

                for (CrawlingEntity crawlingEntity : crawlingEntityList) {
                    crawlingDtoList.add(this.convertEntityToDto(crawlingEntity));

                }
                System.out.println("11111111" + crawlingDtoList);
                for (int k = 0; k < crawlingDtoList.size(); k++) {
                    if (!map.containsKey(crawlingDtoList.get(k).getMenu())) {
                        map.put(crawlingDtoList.get(k).getMenu(), 1);
                    } else {
                        map.put(crawlingDtoList.get(k).getMenu(), map.get(crawlingDtoList.get(k).getMenu()) + 1);
                    }
                }
                System.out.println("ㅁㅁㅁㅁ"+keyword[j]+"ㅁㅁㅁㅁㅁㅁ");
                System.out.println(map);
            }
            Map<String, Integer> sorted_map = ValueSort(map);
            obj.put(refrigList.get(i), sorted_map);
        }
        return obj;
    }

    public Map<String, Integer> ValueSort(Map<String, Integer> map) {
        List<Map.Entry<String, Integer>> entryList = new ArrayList<>(map.entrySet());
        Map<String, Integer> sorted_map = new LinkedHashMap<>();
        Collections.sort(entryList, (o1, o2) -> o2.getValue().compareTo(o1.getValue()));
        for (int i = 0; i < entryList.size(); i++) {
            sorted_map.put(entryList.get(i).getKey(), entryList.get(i).getValue());
        }
        return sorted_map;
    }
}
