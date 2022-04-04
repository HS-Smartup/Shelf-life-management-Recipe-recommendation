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
    private Long RCP_ID;
    private String RCP_NM;    // 레시피 이름
    private String ATT_FILE_NO_MAIN;  // 메인 이미지 (소)
}
