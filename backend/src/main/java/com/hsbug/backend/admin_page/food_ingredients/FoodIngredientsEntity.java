package com.hsbug.backend.admin_page.food_ingredients;

import lombok.Builder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class FoodIngredientsEntity {
    @Id
    @GeneratedValue
    private Long foodIngredientsId;
    private String foodIngredientsName;

    public FoodIngredientsEntity() {
    }
    @Builder
    public FoodIngredientsEntity(Long foodIngredientsId, String foodIngredientsName) {
        this.foodIngredientsId = foodIngredientsId;
        this.foodIngredientsName = foodIngredientsName;
    }
    public FoodIngredientsDto toDto() {
        FoodIngredientsDto dto = new FoodIngredientsDto();
        dto.setFoodIngredientsId(this.foodIngredientsId);
        dto.setFoodIngredientsName(this.foodIngredientsName);
        return dto;
    }
}
