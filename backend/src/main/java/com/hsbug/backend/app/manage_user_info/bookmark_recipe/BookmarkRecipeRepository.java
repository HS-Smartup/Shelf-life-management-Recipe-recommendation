package com.hsbug.backend.app.manage_user_info.bookmark_recipe;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRecipeRepository extends JpaRepository<BookmarkRecipeEntity,Long> {
    BookmarkRecipeEntity findByEmail(String email);
    Optional<BookmarkRecipeEntity> findById(Long id);

}
