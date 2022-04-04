package com.hsbug.backend.app.recipe.my_recipe;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeRepository;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeEntity;
import com.hsbug.backend.app.recipe.recipe_detail.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyRecipeService {

    private final ManageRecipeRepository manageRecipeRepository;
    private final RecipeRepository recipeRepository;

    @Transactional
    public void saveRecipe(ManageRecipeDto manageRecipeDto){
        manageRecipeRepository.save(manageRecipeDto.toEntity());
    }

    public List<RecipeEntity> readRecipe(String email){
        List<RecipeEntity> myRecipe = recipeRepository.findAllByRecipeWriter(email);
        return myRecipe;
    }

    @Transactional
    public void deleteRecipe(Long id){
        manageRecipeRepository.deleteById(id);
    }


    public ManageRecipeDto convertEntityToDto(ManageRecipeEntity manageRecipeEntity){
        return ManageRecipeDto.builder()
                .RCP_ID(manageRecipeEntity.getId())
                .WRITER(manageRecipeEntity.getWRITER())
                .RCP_SEQ(manageRecipeEntity.getRCP_SEQ())
                .RCP_NM(manageRecipeEntity.getRCP_NM())
                .RCP_PAT2(manageRecipeEntity.getRCP_PAT2())
                .RCP_PARTS_DTLS(manageRecipeEntity.getRCPPARTSDTLS())
                .RCP_WAY2(manageRecipeEntity.getRCP_WAY2())
                .ATT_FILE_NO_MAIN(manageRecipeEntity.getATT_FILE_NO_MAIN())
                .ATT_FILE_NO_MK(manageRecipeEntity.getATT_FILE_NO_MK())
                .MANUAL01(manageRecipeEntity.getMANUAL01())
                .MANUAL02(manageRecipeEntity.getMANUAL02())
                .MANUAL03(manageRecipeEntity.getMANUAL03())
                .MANUAL04(manageRecipeEntity.getMANUAL04())
                .MANUAL05(manageRecipeEntity.getMANUAL05())
                .MANUAL06(manageRecipeEntity.getMANUAL06())
                .MANUAL07(manageRecipeEntity.getMANUAL07())
                .MANUAL08(manageRecipeEntity.getMANUAL08())
                .MANUAL09(manageRecipeEntity.getMANUAL09())
                .MANUAL10(manageRecipeEntity.getMANUAL10())
                .MANUAL11(manageRecipeEntity.getMANUAL11())
                .MANUAL12(manageRecipeEntity.getMANUAL12())
                .MANUAL13(manageRecipeEntity.getMANUAL13())
                .MANUAL14(manageRecipeEntity.getMANUAL14())
                .MANUAL15(manageRecipeEntity.getMANUAL15())
                .MANUAL_IMG01(manageRecipeEntity.getMANUAL_IMG01())
                .MANUAL_IMG02(manageRecipeEntity.getMANUAL_IMG02())
                .MANUAL_IMG03(manageRecipeEntity.getMANUAL_IMG03())
                .MANUAL_IMG04(manageRecipeEntity.getMANUAL_IMG04())
                .MANUAL_IMG05(manageRecipeEntity.getMANUAL_IMG05())
                .MANUAL_IMG06(manageRecipeEntity.getMANUAL_IMG06())
                .MANUAL_IMG07(manageRecipeEntity.getMANUAL_IMG07())
                .MANUAL_IMG08(manageRecipeEntity.getMANUAL_IMG08())
                .MANUAL_IMG09(manageRecipeEntity.getMANUAL_IMG09())
                .MANUAL_IMG10(manageRecipeEntity.getMANUAL_IMG10())
                .MANUAL_IMG11(manageRecipeEntity.getMANUAL_IMG11())
                .INFO_ENG(manageRecipeEntity.getINFO_ENG())
                .INFO_CAR(manageRecipeEntity.getINFO_CAR())
                .INFO_PRO(manageRecipeEntity.getINFO_PRO())
                .INFO_FAT(manageRecipeEntity.getINFO_FAT())
                .INFO_NA(manageRecipeEntity.getINFO_NA())
                .HASH_TAG(manageRecipeEntity.getHASH_TAG())
                .views(manageRecipeEntity.getViews())
                .likes(manageRecipeEntity.getLikes())
                .stars(manageRecipeEntity.getStars())
                .ADD_TIME(manageRecipeEntity.getADD_TIME())
                .build();
    }




}

