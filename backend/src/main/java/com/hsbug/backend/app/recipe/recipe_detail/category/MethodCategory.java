package com.hsbug.backend.app.recipe.recipe_detail.category;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MethodCategory {

    StirFried("볶음"),
    Simmer("끓이기"),
    UpsAndDowns("부침"),
    Afforestation("조림"),
    Uncooked("무침"),
    Bibim("비빔"),
    Steamed("찜"),
    Pickles("절임"),
    FriedFood("튀김"),
    Boil("삶기"),
    Roast("굽기"),
    Blanch("데치기"),
    Epsiode("회"),
    Other("기타");

    private final String category;
}
