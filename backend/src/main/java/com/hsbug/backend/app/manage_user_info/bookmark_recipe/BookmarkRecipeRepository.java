package com.hsbug.backend.app.manage_user_info.bookmark_recipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRecipeRepository extends JpaRepository<BookmarkRecipeEntity,Long> {
    BookmarkRecipeEntity findByEmail(String email);
}
