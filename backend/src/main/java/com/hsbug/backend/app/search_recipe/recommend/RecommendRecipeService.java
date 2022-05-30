package com.hsbug.backend.app.search_recipe.recommend;

import com.hsbug.backend.app.manage_user_info.bookmark_recipe.BookmarkRecipeEntity;
import com.hsbug.backend.app.manage_user_info.bookmark_recipe.BookmarkRecipeRepository;
import com.hsbug.backend.app.recipe.recently_viewed_recipes.RecentlyViewRecipe;
import com.hsbug.backend.app.recipe.recently_viewed_recipes.RecentlyViewRecipeRepository;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeEntity;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecommendRecipeService {

    private final RecipeRepository recipeRepository;
    private final BookmarkRecipeRepository bookmarkRecipeRepository;
    private final RecentlyViewRecipeRepository recentlyViewRecipeRepository;


    public List<RecommendRecipeDto> randomRecipe(List<Long>list) {
        List<RecommendRecipeDto> recipeDtoList = new ArrayList<>();

        for (int i = 0; i < 30; i++) {
            Long randomNum = (long) justOneRandom(list);
            System.out.println("randomNum = " + randomNum);
            Optional<RecipeEntity> recipe  = recipeRepository.findById(randomNum);
            RecipeEntity recommendRecipeDto = new RecipeEntity();
            try {
                if (recipe.isPresent()) {
                    recommendRecipeDto = recipe.get();
                } else {
                    recommendRecipeDto = recipeRepository.findById((long) justOneRandom(list)).get();
                }
            } catch (NoSuchElementException e) {
                i--;
                break;
            } catch (NullPointerException e) {
                i--;
                break;
            }

            RecommendRecipeDto recipeDto = RecommendRecipeDto.builder()
                    .id(recommendRecipeDto.getId())
                    .recipeMainImage(recommendRecipeDto.getRecipeMainImage())
                    .recipeName(recommendRecipeDto.getRecipeName())
                    .recipeViews(recommendRecipeDto.getRecipeViews())
                    .recipeWriter(recommendRecipeDto.getRecipeWriter())
                    .build();
            recipeDtoList.add(recipeDto);
            list.add(recipeDto.getId());
        }

        return recipeDtoList;
    }

    private int makeRandomId() {
        Random random = new Random();
        int max = recipeRepository.getMaxId().intValue();
        int min = 1;
        return random.nextInt(max - min ) + min;
    }


    public List<RecommendRecipeDto> recommendSystem(String email) {
        List<RecommendRecipeDto> recipeDto = new ArrayList<>();
        List<Long> idList = new ArrayList<>();
        //1.좋아요 기반으로 추천할 레시피를 찾는다.
        try {
            likeRecommend(email, recipeDto);
            System.out.println("recipeDto = " + recipeDto);
            //2.최근에 본 레시피를 기반으로 추천할 레시피를 찾는다.
            recentlyViewRecipe(email, recipeDto);
        } catch (NullPointerException e) {
            log.info("recentlyViewRecipe = Null");
        }
        int size = recipeDto.size();
        System.out.println("size = " + size);

        for (RecommendRecipeDto dto:recipeDto) {
            idList.add(dto.getId());
        }
//        addSizeRecipe(recipeDto,idList);
        recipeDto.addAll(deRandomRecipe(idList));

        return recipeDto;
    }

    public List<RecommendRecipeDto> deRandomRecipe(List<Long> list) {
        RecipeEntity recommendRecipe = new RecipeEntity();
        List<RecommendRecipeDto> dtoList = new ArrayList<>();
        int[] ids = makeRandomId(list);
        for (int i = 0; i < (10 - list.size()); i++) {
            Optional<RecipeEntity> recipe = recipeRepository.findById((long) ids[i + list.size()]);
            try {
                if (recipe.isPresent()) {
                    recommendRecipe = recipe.get();
                } else {
                    recommendRecipe = recipeRepository.findById((long) justOneRandom(list)).get();
                }
            } catch (NoSuchElementException e) {
                i--;
                break;
            }
            RecommendRecipeDto recipeDto = RecommendRecipeDto.builder()
                    .id(recommendRecipe.getId())
                    .recipeMainImage(recommendRecipe.getRecipeMainImage())
                    .recipeName(recommendRecipe.getRecipeName())
                    .recipeViews(recommendRecipe.getRecipeViews())
                    .recipeWriter(recommendRecipe.getRecipeWriter())
                    .build();
            dtoList.add(recipeDto);
        }


        return dtoList;
    }


    private void likeRecommend(String email, List<RecommendRecipeDto> recipeDto) {
        BookmarkRecipeEntity recentlyLikeRecipe = bookmarkRecipeRepository.findByEmailOrderByIdDesc(email);
        System.out.println("recentlyLikeRecipe = " + recentlyLikeRecipe);
        //최근에 좋아요 한 레시피
        RecipeEntity recipe = recipeRepository.findById(recentlyLikeRecipe.getId()).get();
        System.out.println("recipe = " + recipe);
        List<RecipeEntity> allByIngredientCategory = recipeRepository.findTop5ByIngredientCategoryOrderByRecipeViews(recipe.getIngredientCategory());
        for (RecipeEntity recipes: allByIngredientCategory) {
            recipeDto.add(toRecommendDto(recipes));
        }
    }

    public void recentlyViewRecipe(String email, List<RecommendRecipeDto> recipeDto) {
        RecentlyViewRecipe recentlyViewRecipe = recentlyViewRecipeRepository.findByUserEmailOrderByIdDesc(email);
        RecipeEntity recipeEntity = recipeRepository.findById(recentlyViewRecipe.getId()).get();
        List<RecipeEntity> allByIngredientCategory = recipeRepository.findTop5ByIngredientCategoryOrderByRecipeViews(recipeEntity.getIngredientCategory());
        for (RecipeEntity recipe : allByIngredientCategory) {
            recipeDto.add(toRecommendDto(recipeEntity));
        }
    }

    //중복방지하면서 랜던 id를 생성해주는 로직
    public int[] makeRandomId(List<Long>list) {
        int[] a = new int[10];
        Random random = new Random();
        int max = recipeRepository.getMaxId().intValue();
        System.out.println("max = " + max);
        int min = 1;
        //rNum = random.nextInt(recipeRepository.getMaxId().intValue()) + 1;
        int count = 0;
        for (int i = 0; i < 10; i++) {
            //카운팅 변수를 선언
            //랜덤 값을 받음
            if (count < i) {
                count = i;
            }
            a[count] = random.nextInt(max - min) + 1;
            System.out.println("nextRandom = " + a[count] + " / " + count);
            //리스트 값과 중복되는지 중복검사
            for (Long ll : list) {
                if (a[count] == ll) {
                    i--;
                    System.out.println("ll / i--"+"\t"+count);
                    break;
                } else {
                    //내가 만든 숫자의 중복검사
                    for (int j = 0; j < i; j++) {
                        if (a[count] == a[j]) {
                            i--;
                            System.out.println("j=count / i--"+a[j]+"\t"+count);
                            break;
                        }
                    }
                }
            }
        }
        return a;
    }

    private int justOneRandom(List<Long>list) {
        Random random = new Random();
        int max = recipeRepository.getMaxId().intValue();
        System.out.println("max = " + max);
        int min = 1;
        //rNum = random.nextInt(recipeRepository.getMaxId().intValue()) + 1;
        //리스트 값과 중복되는지 중복검사
        int randomInt = random.nextInt(max - min) + 1;
        for (int i = 1; i < list.size(); i++) {
            if (randomInt == list.get(i)) {
                i = 1;
                randomInt = random.nextInt(max - min) + 1;
            }
        }
        return randomInt;
    }

    private RecommendRecipeDto toRecommendDto(RecipeEntity entity) {
        return RecommendRecipeDto.builder()
                .id(entity.getId())
                .recipeName(entity.getRecipeName())
                .recipeMainImage(entity.getRecipeMainImage())
                .recipeWriter(entity.getRecipeWriter())
                .recipeViews(entity.getRecipeViews())
                .build();
    }

}
