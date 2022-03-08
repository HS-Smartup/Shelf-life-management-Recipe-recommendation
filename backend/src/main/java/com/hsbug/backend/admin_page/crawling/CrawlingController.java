package com.hsbug.backend.admin_page.crawling;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @ResponseBody
    @PostMapping("/crawling")
    public Map<String, List> crawlingPageFix(@RequestBody CrawlingRequestDto requestDto) throws IOException {
        Map<String, List> searchResult = crawlingService.findTextByCssQuery(requestDto);
        return searchResult;
    }

}
