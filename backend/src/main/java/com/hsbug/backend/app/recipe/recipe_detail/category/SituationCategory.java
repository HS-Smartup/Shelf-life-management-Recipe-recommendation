package com.hsbug.backend.app.recipe.recipe_detail.category;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum SituationCategory {

    DailyLife("일상"),
    Snack("간식"),
    MidnightSnack("야식"),
    SimpleCooking("간단요리"),
    GuestReception("손님접대"),
    Snacks("술안주"),
    Diet("다이어트"),
    HealthyFood("건강식"),
    Vegan("비건"),
    LunchBox("도시락"),
    Haejang("해장"),
    Holiday("명절"),
    BabyFood("이유식"),
    Other("기타");

    private final String category;
}
