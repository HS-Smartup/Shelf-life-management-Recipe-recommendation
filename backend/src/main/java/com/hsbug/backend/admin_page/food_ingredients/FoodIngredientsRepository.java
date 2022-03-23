package com.hsbug.backend.admin_page.food_ingredients;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FoodIngredientsRepository extends JpaRepository<FoodIngredientsEntity,Long> {
     Optional<FoodIngredientsEntity> findByFoodIngredientsName(String foodingredientsname);
}
