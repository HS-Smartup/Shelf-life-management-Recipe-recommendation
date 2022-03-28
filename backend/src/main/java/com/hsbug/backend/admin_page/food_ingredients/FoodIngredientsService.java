package com.hsbug.backend.admin_page.food_ingredients;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class FoodIngredientsService {
    private final FoodIngredientsRepository foodIngredientsRepository;

    public boolean alreadyHasFoodIngredients(String foodName) {
        boolean check = foodIngredientsRepository.findByFoodIngredientsName(foodName).isEmpty();
        log.info("check ={}",check);
        return check;
    }
    public void save(FoodIngredientsDto dto) {
        foodIngredientsRepository.save(dto.toEntity());
    }
}
