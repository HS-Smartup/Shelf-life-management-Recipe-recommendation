package com.hsbug.backend.admin_page.recipe.my_recipe;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.admin_page.recipe.recipe.RecipeJsonDTO;
import com.hsbug.backend.admin_page.recipe.recipe_attribute.RecipeIngredientsDTO;
import com.hsbug.backend.admin_page.recipe.recipe.RecipeService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
        List<ManageRecipeDto> manageRecipeDtoList = myRecipeService.readRecipe(email);
        obj.put("message","리드 완료");

        myRecipeService.readRecipe(email);

        for (int i = 0; i< manageRecipeDtoList.size(); i++){
            obj.put((i+1),manageRecipeDtoList.get(i));
        }

        return obj;
    }

    @PostMapping("/add")
    public List addMyRecipe(@RequestBody RecipeJsonDTO dto){
        String email = findEmail();
        JSONObject obj = new JSONObject();
        dto.setRecipeWriter(email);
        List<RecipeIngredientsDTO> resultList = new ArrayList<>();
        System.out.println(dto.getRecipeIngredients());
        System.out.println(dto.getRecipeStep());
        Long id = recipeService.saveRecipe(dto);


        System.out.println("=====================================");

        System.out.println("=====================================");

        return resultList;


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
