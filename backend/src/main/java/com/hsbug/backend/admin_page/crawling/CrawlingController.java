package com.hsbug.backend.admin_page.crawling;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class CrawlingController{
    private final CrawlingService crawlingService;

    /**
     * post input값 예시
     *     {
     *         "url": "http://kfoodtech.com/?page_id=734",
     *             "cssQuery" : "h2[class=blog-shortcode-post-title entry-title]"
     *     }
     */
    @PostMapping("/crawling")
    public Map<String, List> crawlingPageFix(@RequestBody CrawlingRequestDto requestDto) throws IOException {
        Map<String, List> searchResult = crawlingService.findTextByCssQuery(requestDto);
        return searchResult;
    }

    @ResponseBody
    @PostMapping("/crawlingText")
    public Map<String, List> crawlingPageText(@RequestBody CrawlingRequestDto requestDto) throws IOException {
        Map<String, List> searchResult = crawlingService.findTextByCssQueryNotABS(requestDto);
        return searchResult;
    }



    /**
     * Method : Get
     * kfoodtech 사이트의 다중 페이지를 한번에 검색함 (id 기반)
     * @return
     * @throws IOException
     */
    @GetMapping("/crawling2")
    public JSONObject crawlingPageFix2() throws IOException {
        JSONObject obj = new JSONObject();
        List<String> totalSearchList = crawlingService.kfoodtechCrawling();
        obj.put("totalSearchList", totalSearchList);
        return obj;
    }
}
