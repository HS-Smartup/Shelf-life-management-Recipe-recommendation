package com.hsbug.backend.app.refrigerator.manage_product;

import com.hsbug.backend.app.refrigerator.add_product.AddProductDto;
import com.hsbug.backend.app.refrigerator.add_product.AddProductService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class ManageProductController {

    private final ManageProductService manageProductService;

    @GetMapping("/readProduct")
    public JSONObject ReadProduct(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        List<AddProductDto> productDtoList = manageProductService.findProduct(email);
        JSONObject obj = new JSONObject();
        obj.put("message","리드 완료");
        for (int i = 0; i< productDtoList.size(); i++){
            obj.put("raw"+i,productDtoList.get(i));
        }

        return obj;
    }

    @PostMapping("/deleteProduct")
    public JSONObject DeleteProduct(@RequestParam Long id) {
        JSONObject obj = new JSONObject();
        manageProductService.deleteProduct(id);
        obj.put("message",id+" 삭제 완료");
        return obj;
    }
}
