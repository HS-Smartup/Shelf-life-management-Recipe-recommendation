package com.hsbug.backend.app.recipe.recipe_detail.category;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TypeCategory {
    SideDish("밑반찬"),
    MainDish("메인반찬"),
    SoupSoupJjigae("국/탕/찌개"),
    NoodlesDumplings("면/만두"),
    RiceRiceCakePorridge("밥/떡/죽"),
    WesternFood("양식"),
    ChineseFood("중식"),
    JapaneseFood("일식"),
    KimchiJeotgalJang("김치/젓갈/장"),
    SeasoningSauceJam("양념/소스/잼"),
    Dessert("디저트"),
    TeaBeverageLiquor("차/음료/술"),
    Other("기타");

    private final String category;
}
