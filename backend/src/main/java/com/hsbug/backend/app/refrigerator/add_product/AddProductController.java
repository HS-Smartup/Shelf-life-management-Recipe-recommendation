package com.hsbug.backend.app.refrigerator.add_product;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class AddProductController {

    private final AddProductService addProductService;

    @PostMapping("/addProduct")
    public JSONObject AddProduct(@RequestBody AddProductDto addProductDto) {
        JSONObject obj = new JSONObject();
        obj.put("obj",addProductDto);
        addProductService.save(addProductDto);
        return obj;
    }
}
