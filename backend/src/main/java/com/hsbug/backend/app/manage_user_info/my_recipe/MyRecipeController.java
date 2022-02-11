package com.hsbug.backend.app.manage_user_info.my_recipe;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/myrecipe")
@RequiredArgsConstructor
public class MyRecipeController {

    private final MyRecipeService myRecipeService;

    @GetMapping("/MyRecipe/read")
    public JSONObject readMyRecipe() {
        String email = findEmail();
        JSONObject obj = new JSONObject();
        List<ManageRecipeDto> manageRecipeDtoList = myRecipeService.readRecipe(email);
        obj.put("message","리드 완료");

        myRecipeService.readRecipe(email);

        for (int i = 0; i< manageRecipeDtoList.size(); i++){
            obj.put((i+1),manageRecipeDtoList.get(i));
        }

        return obj;
    }

    @PostMapping("/MyRecipe/add")
    public JSONObject addMyRecipe(@RequestBody ManageRecipeDto manageRecipeDto){
        String email = findEmail();
        JSONObject obj = new JSONObject();
        manageRecipeDto.setWRITER(email);

        myRecipeService.saveRecipe(manageRecipeDto);
        obj.put("message","저장");
        obj.put("content : ",manageRecipeDto);
        return obj;
    }

    @PostMapping("/MyRecipe/delete")
    public JSONObject deleteMyRecipe(@RequestParam Long id){
        JSONObject obj = new JSONObject();
        myRecipeService.deleteRecipe(id);
        obj.put("message",id + " 삭제 완료");

        return obj;
    }

    private String findEmail() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return email;
    }

}
