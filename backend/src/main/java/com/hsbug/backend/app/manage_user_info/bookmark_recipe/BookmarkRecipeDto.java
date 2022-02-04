package com.hsbug.backend.app.manage_user_info.bookmark_recipe;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@Builder
public class BookmarkRecipeDto {
    private Long id;
    private String email;
    private List<Long> recipe_id;

    public BookmarkRecipeEntity toEntity(){
        return BookmarkRecipeEntity.builder()
                .id(id)
                .email(email)
                .recipe_id(recipe_id)
                .build();
    }
}
