package com.hsbug.backend.app.recipe.recipe_detail.category;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum IngredientsCategory {
    //카테고리 분류를 enum말고 그냥 string으로 진행 해야 할것같음
    //String으로 진행 할 경우 발생할 문제점은 무엇일까 sql에 우리가 정해둔 카테고리 값이 아닌값이 들어갈 수 있다.
    //but token값을 가지고 있지 않다면 어짜피 입력이 불가능하다.
    //so -> String 으로 진행해도 상관이 없을 것이다.
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
