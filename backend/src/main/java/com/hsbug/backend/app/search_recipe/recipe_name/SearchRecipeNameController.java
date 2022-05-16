package com.hsbug.backend.app.search_recipe.recipe_name;

import com.hsbug.backend.app.search_recipe._refrigerator.SearchRecipeRefrigDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user/search")
public class SearchRecipeNameController {

    private final SearchRecipeNameService searchRecipeNameService;
    @GetMapping("/name")
    public List<SearchRecipeRefrigDto> searchByRecipeName(@RequestParam String search) {
        System.out.println(search);
        return searchRecipeNameService.searchRecipeName(search);
    }

}
