package com.hsbug.backend.app.recipe.recently_viewed_recipes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecentlyViewRecipeRepository extends JpaRepository<RecentlyViewRecipe, Long> {
    List<RecentlyViewRecipe> findAllByUserEmailOrderByIdDesc(String userEmail);
    RecentlyViewRecipe findTopByUserEmailOrderByIdDesc(String email);
    RecentlyViewRecipe findByUserEmailOrderByIdDesc(String email);
    void deleteByRecipeIdAndAndUserEmail(Long id, String userEmail);
}
