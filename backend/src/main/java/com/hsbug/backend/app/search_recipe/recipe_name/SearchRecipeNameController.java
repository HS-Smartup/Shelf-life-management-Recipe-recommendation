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
@RequestMapping("/user/search/name")
public class SearchRecipeNameController {

    private final SearchRecipeNameService searchRecipeNameService;
    @GetMapping
    public List<SearchRecipeRefrigDto> searchByRecipeName(@RequestParam String search) {
        return searchRecipeNameService.searchRecipeName(search);
    }
}
