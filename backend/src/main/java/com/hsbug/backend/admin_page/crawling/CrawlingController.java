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

    @PostMapping("/crawling")
    public Map<String, List> crawlingPageFix(@RequestBody CrawlingRequestDto requestDto) throws IOException {
        Map<String, List> searchResult = crawlingService.findTextByCssQuery(requestDto);
        return searchResult;
    }

    @ResponseBody
    @PostMapping("/crawlingText")
    public List<String> crawlingPageText(@RequestBody CrawlingRequestDto requestDto) throws IOException {
        List<String> searchResult = searchResult = crawlingService.findTextByCssQueryNotABS(requestDto);
        return searchResult;
    }

    @GetMapping("/crawling2")
    public JSONObject crawlingPageFix2() throws IOException {
        JSONObject obj = new JSONObject();
        List<String> totalSearchList = crawlingService.kfoodtechCrawling();
        obj.put("totalSearchList", totalSearchList);
        return obj;
    }
}
