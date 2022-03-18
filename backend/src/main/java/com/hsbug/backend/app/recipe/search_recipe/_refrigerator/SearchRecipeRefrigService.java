package com.hsbug.backend.app.recipe.search_recipe._refrigerator;

import com.hsbug.backend.admin_page.crawling.CrawlingDto;
import com.hsbug.backend.admin_page.crawling.CrawlingEntity;
import com.hsbug.backend.admin_page.crawling.CrawlingRepository;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeRepository;
import com.hsbug.backend.app.manage_user_info.my_recipe.MyRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SearchRecipeRefrigService {

    private final ManageRecipeRepository manageRecipeRepository;
    private final CrawlingRepository crawlingRepository;
    private final MyRecipeService myRecipeService;

    public Map<Long, Integer> findRecipeFromRefrig(ArrayList product_list) {
        HashMap<Long, Integer> map = new HashMap<>();
        for (int i = 0; i < product_list.size(); i++) {
            String product = product_list.get(i).toString();

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
        return map;
    }


    public CrawlingDto convertEntityToDto(CrawlingEntity crawlingEntity) {
        return CrawlingDto.builder()
                .id(crawlingEntity.getId())
                .menu(crawlingEntity.getMenu())
                .build();
    }

    public ArrayList findProduct(ArrayList<String> refrigList) {
        ArrayList productList = new ArrayList<>();
        for (int i = 0; i < refrigList.size(); i++) {           // 냉장고에서 대파, 양파, 고구마 가져옴
            HashMap<String, Integer> map = new HashMap<>();
            String keyword_all = refrigList.get(i);
            String[] keyword_slice = refrigList.get(i).split(" ");
            String[] keyword = refrigList.get(i).replace(" ", "").split("");

            if (!crawlingRepository.findByMenu(keyword_all).isEmpty()) {  // 키워드 재료테이블과 일치하는지 확인
                productList.add(keyword_all);
            } else {
                for (int j = 0; j < keyword.length; j++) {               // 대, 파       양, 파       고, 구, 마  for문 돌아줌
                    List<CrawlingEntity> crawlingEntityList = crawlingRepository.findByMenuContains(keyword[j]);
                    List<CrawlingDto> crawlingDtoList = new ArrayList<>();

                    for (CrawlingEntity crawlingEntity : crawlingEntityList) {  // entity to dto
                        crawlingDtoList.add(this.convertEntityToDto(crawlingEntity));
                    }

                    for (int k = 0; k < crawlingDtoList.size(); k++) {          // 레시피 관련도 점수 부여
                        if (!map.containsKey(crawlingDtoList.get(k).getMenu())) {
                            map.put(crawlingDtoList.get(k).getMenu(), 1);
                        } else {
                            map.put(crawlingDtoList.get(k).getMenu(), map.get(crawlingDtoList.get(k).getMenu()) + 1);
                        }
                    }
                }
                for (int l = 0; l < keyword_slice.length; l++) {               // 맛있는, 돼지고기, 삼겹살  for문 돌아줌
                    List<CrawlingEntity> crawlingEntityList = crawlingRepository.findByMenuContains(keyword_slice[l]);
                    List<CrawlingDto> crawlingDtoList = new ArrayList<>();

                    for (CrawlingEntity crawlingEntity : crawlingEntityList) {
                        crawlingDtoList.add(this.convertEntityToDto(crawlingEntity));

                    }
                    for (int m = 0; m < crawlingDtoList.size(); m++) {          // 레시피 관련도 점수 부여
                        if (!map.containsKey(crawlingDtoList.get(m).getMenu())) {
                            map.put(crawlingDtoList.get(m).getMenu(), 1);
                        } else {
                            map.put(crawlingDtoList.get(m).getMenu(), map.get(crawlingDtoList.get(m).getMenu()) + 1);
                        }
                    }

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
}
