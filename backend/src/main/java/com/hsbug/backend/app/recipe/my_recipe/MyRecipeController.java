package com.hsbug.backend.app.recipe.my_recipe;

import com.hsbug.backend.app.recipe.recipe_detail.RecipeEntity;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeJsonDTO;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeService;
import com.hsbug.backend.app.user_register.UserRegisterEntity;
import com.hsbug.backend.app.user_register.UserRegisterRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/myRecipe")
@RequiredArgsConstructor
public class MyRecipeController {

    private final MyRecipeService myRecipeService;
    private final RecipeService recipeService;
    private final UserRegisterRepository userRegisterRepository;

    @GetMapping("/read")
    public JSONObject readMyRecipe() {
        String email = findEmail();
        JSONObject obj = new JSONObject();
        List<RecipeEntity> recipeDtoList = myRecipeService.readRecipe(email);
        myRecipeService.readRecipe(email);

        obj.put("message","리드 완료");
        obj.put("recipeItem", recipeDtoList);
        obj.put("status", 200);
        return obj;
    }

    @PostMapping("/add")
    public JSONObject addMyRecipe(@RequestBody RecipeJsonDTO dto){
        String email = findEmail();
        JSONObject obj = new JSONObject();
        UserRegisterEntity userRegisterEntity = userRegisterRepository.findByEmail(email).get();
        dto.setRecipeWriter(userRegisterEntity.getUsername());

        System.out.println(dto.getRecipeIngredients());
        System.out.println(dto.getRecipeStep());
        Long id = recipeService.saveRecipe(dto);
        obj.put("status", 200);
        obj.put("resultstatus", "저장되었습니다.");
        return obj;
    }

    @PostMapping("/delete")
    public JSONObject deleteMyRecipe(@RequestParam Long id){
        JSONObject obj = new JSONObject();
        myRecipeService.deleteRecipe(id);
        obj.put("message",id + " 삭제 완료");
        obj.put("status", 200);

        return obj;
    }

    //수정 추가해야함. 5/18
    @PutMapping("/update")
    public JSONObject updateMyRecipe(@RequestBody RecipeJsonDTO dto){
        String email = findEmail();
        JSONObject obj = new JSONObject();
        //UserRegisterEntity userRegisterEntity = userRegisterRepository.findById(dto.getId()).get();
        Long id = recipeService.saveRecipe(dto);
        obj.put("message",id+" 수정 완료");
        obj.put("status",200);
        return obj;
    }



    private String findEmail() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return email;
    }

}
