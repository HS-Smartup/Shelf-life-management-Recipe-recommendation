package com.hsbug.backend.admin_page.food_ingredients;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodIngredientsDto {
    private Long foodIngredientsId;
    private String foodIngredientsName;

    public FoodIngredientsEntity toEntity() {
        FoodIngredientsEntity entity = FoodIngredientsEntity.builder()
                .foodIngredientsId(this.foodIngredientsId)
                .foodIngredientsName(this.foodIngredientsName)
                .build();
        return entity;
    }
}
