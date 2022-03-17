package com.hsbug.backend.app.refrigerator.api;

import com.hsbug.backend.admin_page.crawling.CrawlingService;
import com.hsbug.backend.app.refrigerator.manage_product.ManageProductDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/user/barcode")
@RequiredArgsConstructor
public class CrawlingBarcodeController {

    private final CrawlingService crawlingService;

    @GetMapping("/crawling")
    public ManageProductDto crawlingBarcode(@RequestParam String barcode) throws IOException {
//        JSONObject obj = new JSONObject();
        ManageProductDto searchResult = crawlingService.barcodeCrawling(barcode);
        return searchResult;
    }
}
