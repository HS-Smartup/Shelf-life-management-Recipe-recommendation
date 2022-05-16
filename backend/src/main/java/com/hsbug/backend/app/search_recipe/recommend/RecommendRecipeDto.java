package com.hsbug.backend.app.search_recipe.recommend;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class RecommendRecipeDto {
    private Long id;
    private String recipeName;    // 레시피 이름
    private String recipeMainImage;  // 메인 이미지 (소)
    private String recipeWriter; // 레시피 작성자
    private Integer recipeViews; // 레시피 조회수
}
