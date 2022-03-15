package com.hsbug.backend.admin_page.crawling;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CrawlingRepository extends JpaRepository<CrawlingEntity,Long> {
    List<CrawlingEntity> findByMenuContains(String menu);
    Optional<CrawlingEntity> findByMenu(String menu);
}
