package com.hsbug.backend.app.refrigerator.api;

import com.hsbug.backend.admin_page.crawling.CrawlingService;
import com.hsbug.backend.app.refrigerator.manage_product.ManageProductDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
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

    @GetMapping("/info")
    public JSONObject crawlingBarcode(@RequestParam String barcode) throws IOException {
        JSONObject obj = new JSONObject();
        ManageProductDto searchResult = crawlingService.barcodeCrawling(barcode);
        if (searchResult.getItemImage().isEmpty()) {
            if (searchResult.getItemName().isEmpty()) {
                obj.put("status", 204);
                obj.put("message", "해당 바코드의 상품정보가 없습니다.");
            } else {
                obj.put("status", 206);
                obj.put("info", searchResult);
                obj.put("message", "해당 바코드에는 이미지가 없습니다.");
            }
        }else{  //정상적인 결과일 경우
            obj.put("status", 200);
            obj.put("info", searchResult);
        }
        return obj;
    }
}
