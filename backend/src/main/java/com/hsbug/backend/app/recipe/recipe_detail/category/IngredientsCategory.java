package com.hsbug.backend.app.recipe.recipe_detail.category;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum IngredientsCategory {
    Meat("육류"),
    Beef("소고기"),
    Pork("돼지고기"),
    Chicken("닭고기"),
    Vegetables("채소류"),
    Seafood("해물류"),
    EggsDairyProducts("달걀/유제품"),
    ProcessedFood("가공식품"),
    RiceGrains("쌀/곡류"),
    Flour("밀가루"),
    DriedFish("건어물류"),
    Mushroom("버섯류"),
    Fruit("과일류"),
    BeansNuts("콩/견과류"),
    Other("기타");


    private final String category;
}
