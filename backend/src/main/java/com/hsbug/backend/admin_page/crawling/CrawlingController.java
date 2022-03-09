package com.hsbug.backend.admin_page.crawling;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class CrawlingController{

    private final CrawlingService crawlingService;
    /*
    post input값 예시
    {
        "url": "http://kfoodtech.com/?page_id=734",
            "cssQuery" : "h2[class=blog-shortcode-post-title entry-title]"
    }*/
    @ResponseBody
    @PostMapping("/crawling")
    public Map<String, List> crawlingPageFix(@RequestBody CrawlingRequestDto requestDto) throws IOException {
        Map<String, List> searchResult = crawlingService.findTextByCssQuery(requestDto);
        return searchResult;
    }

    @GetMapping("/crawling2")
    public JSONObject crawlingPageFix2() throws IOException {
        JSONObject obj = new JSONObject();

        // 71 10p, 975 2p, 971 2p,  961 4p, 963 3p, 967 2p, 959 2p, 734 2p
        Integer[] pageList = {71,975,971,961,963,967,959,734,973,977,969,965,957,951,953,955,943,945,947,949,734,737,739,741,69};
        System.out.println(pageList);
        String url = "http://kfoodtech.com/?page_id=";
        String cssQuery = "h2[class=blog-shortcode-post-title entry-title]";
        for (int i = 0; i<pageList.length; i++){
            if (pageList[i] == 71){ // 10
                for (int j = 1; j<=10; j++){
                    System.out.println(url + pageList[i] +"&paged=" + j);
                    Map<String, List> searchResult = crawlingService.findTextByCssQuery2(url + pageList[i]+"&paged="+j, cssQuery);
                    obj.put(i+"-"+j,searchResult);
                }
            }
            else if(pageList[i] == 975 || pageList[i] == 971 || pageList[i] == 967 || pageList[i] == 959 || pageList[i] == 734){  // 2
                for (int j = 1; j<=2; j++){
                    System.out.println(url + pageList[i] +"&paged=" + j);
                    Map<String, List> searchResult = crawlingService.findTextByCssQuery2(url + pageList[i]+"&paged="+j, cssQuery);
                    obj.put(i+"-"+j,searchResult);
                }
            }
            else if(pageList[i] == 961){  // 4
                for (int j = 1; j<=4; j++){
                    System.out.println(url + pageList[i] +"&paged=" + j);
                    Map<String, List> searchResult = crawlingService.findTextByCssQuery2(url + pageList[i]+"&paged="+j, cssQuery);
                    obj.put(i+"-"+j,searchResult);
                }
            }
            else if(pageList[i] == 963){  // 3
                for (int j = 1; j<=3; j++){
                    System.out.println(url + pageList[i] +"&paged=" + j);
                    Map<String, List> searchResult = crawlingService.findTextByCssQuery2(url + pageList[i]+"&paged="+j, cssQuery);
                    obj.put(i+"-"+j,searchResult);
                }
            }else {
                System.out.println(url + pageList[i]);
                Map<String, List> searchResult = crawlingService.findTextByCssQuery2(url + pageList[i], cssQuery);
                obj.put(i, searchResult);
            }
        }

        //obj.put(1,searchResult);
        return obj;
    }
}
