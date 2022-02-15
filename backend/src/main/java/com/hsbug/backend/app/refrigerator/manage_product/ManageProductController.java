package com.hsbug.backend.app.refrigerator.manage_product;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/refrig")
@RequiredArgsConstructor
public class ManageProductController {

    private final ManageProductService manageProductService;

    @PostMapping("/addProduct")
    public JSONObject AddProduct(@RequestBody ManageProductDto addProductDto) {
        JSONObject obj = new JSONObject();
        String email = findEmail();
        addProductDto.setEmail(email);
        obj.put("obj",addProductDto);
        obj.put("status",200);
        manageProductService.save(addProductDto);
        return obj;
    }

    @GetMapping("/readProduct")
    public JSONObject ReadProduct(){
        String email = findEmail();
        List<ManageProductDto> productDtoList = manageProductService.findProduct(email);
        JSONObject obj = new JSONObject();
        obj.put("message","read 완료");
        obj.put("status",200);
        for (int i = 0; i< productDtoList.size(); i++){
            obj.put((i+1),productDtoList.get(i));
        }

        return obj;
    }

    @PostMapping("/deleteProduct")
    public JSONObject DeleteProduct(@RequestParam Long id) {
        JSONObject obj = new JSONObject();
        manageProductService.deleteProduct(id);
        obj.put("message",id+" 삭제 완료");
        obj.put("status",200);
        return obj;
    }

    private String findEmail() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return email;
    }
}
