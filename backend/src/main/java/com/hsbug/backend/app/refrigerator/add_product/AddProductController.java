package com.hsbug.backend.app.refrigerator.add_product;

import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AddProductController {

    private final AddProductService addProductService;

    public AddProductController(AddProductService addProductService) {
        this.addProductService = addProductService;
    }

    @PostMapping("/addProduct")
    public JSONObject AddProduct(@RequestBody AddProductDto addProductDto) {
        JSONObject obj = new JSONObject();
        obj.put("obj",addProductDto);

        return obj;
    }
}
