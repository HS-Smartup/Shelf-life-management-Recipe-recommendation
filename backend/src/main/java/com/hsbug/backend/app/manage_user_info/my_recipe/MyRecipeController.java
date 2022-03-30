package com.hsbug.backend.app.manage_user_info.my_recipe;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.admin_page.recipe_attribute.RecipeIngredients;
import com.hsbug.backend.admin_page.recipe_attribute.RecipeIngredientsDTO;
import com.hsbug.backend.admin_page.recipe_attribute.RecipeIngredientsService;
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
    private final RecipeIngredientsService recipeIngredientsService;


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
    public List addMyRecipe(@RequestBody ManageRecipeDto manageRecipeDto){
        String email = findEmail();
        JSONObject obj = new JSONObject();
        manageRecipeDto.setWRITER(email);
        List<RecipeIngredientsDTO> resultList = new ArrayList<>();
        Long id = recipeIngredientsService.saveRecipe(manageRecipeDto);
        List ingredientsList = recipeIngredientsService.findIngredientsList(id);
        System.out.println("=====================================");
        List<RecipeIngredients> result = recipeIngredientsService.findIngredientsList(id);
        for ( RecipeIngredients recipeIngredients: result) {
            int count = 0;
            System.out.println("제료 리스트 = " + recipeIngredients.getRecipeEntityId().getRecipeIngredientsList().get(count).toString());
            resultList.add(recipeIngredients.toDto());
            count++;
        }
        //반환값을 바꿔서 나가게 작업이 추가로 필요함
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
