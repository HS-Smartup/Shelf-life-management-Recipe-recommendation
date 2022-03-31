package com.hsbug.backend.admin_page.recipe.recipeStep;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeStepRepository extends JpaRepository<RecipeStepEntity, Long> {
}
