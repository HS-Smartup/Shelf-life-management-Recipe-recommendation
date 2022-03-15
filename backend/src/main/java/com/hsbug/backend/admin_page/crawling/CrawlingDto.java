package com.hsbug.backend.admin_page.crawling;

import com.hsbug.backend.app.manage_user_info.bookmark_recipe.BookmarkRecipeEntity;
import lombok.Builder;
import lombok.Data;

@Data
public class CrawlingDto {
    private Long id;
    private String menu;

    @Builder
    public CrawlingDto(Long id, String menu){
        this.id = id;
        this.menu = menu;
    }

    public CrawlingEntity toEntity(){
        return CrawlingEntity.builder()
                .menu(menu)
                .build();
    }

    public CrawlingDto() {

    }
}
