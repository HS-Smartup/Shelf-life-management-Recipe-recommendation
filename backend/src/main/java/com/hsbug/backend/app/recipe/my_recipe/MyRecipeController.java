package com.hsbug.backend.app.recipe.my_recipe;

import com.hsbug.backend.app.recipe.recipe_detail.RecipeEntity;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeJsonDTO;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/myRecipe")
@RequiredArgsConstructor
public class MyRecipeController {

    private final MyRecipeService myRecipeService;
    private final RecipeService recipeService;


    @GetMapping("/read")
    public JSONObject readMyRecipe() {
        String email = findEmail();
        JSONObject obj = new JSONObject();
        List<RecipeEntity> recipeDtoList = myRecipeService.readRecipe(email);
        myRecipeService.readRecipe(email);

        obj.put("message","리드 완료");
        for (int i = 0; i< recipeDtoList.size(); i++){
            obj.put((i+1),recipeDtoList.get(i));
        }
        return obj;
    }

    @PostMapping("/add")
    public JSONObject addMyRecipe(@RequestBody RecipeJsonDTO dto){
        String email = findEmail();
        JSONObject obj = new JSONObject();
        dto.setRecipeWriter(email);

        System.out.println(dto.getRecipeIngredients());
        System.out.println(dto.getRecipeStep());
        Long id = recipeService.saveRecipe(dto);
        obj.put("networkStatus", HttpStatus.OK);
        obj.put("status", "저장되었습니다.");
        return obj;
    }

    @PostMapping("/delete")
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
