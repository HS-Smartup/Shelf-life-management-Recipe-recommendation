package com.hsbug.backend.admin_page.manage_recipe;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ManageRecipeDto {
        private String RCP_SEQ;  // 레시피 번호
        private String RCP_NM;    // 레시피 이름
        private String RCP_PAT2;  // 요리 종류
        private String RCP_PARTS_DTLS;  // 재료 정보
        private String RCP_WAY2;      // 조리 방법 (끓이기, 굽기, 찌기 등)

        private String ATT_FILE_NO_MAIN;  // 메인 이미지 (소)
        private String ATT_FILE_NO_MK;    // 메인 이미지 (소)

        private String MANUAL01;  //요리 순서
        private String MANUAL02;  //요리 순서
        private String MANUAL03;  //요리 순서
        private String MANUAL04;  //요리 순서
        private String MANUAL05;  //요리 순서
        private String MANUAL06;  //요리 순서
        private String MANUAL07;  //요리 순서
        private String MANUAL08;  //요리 순서
        private String MANUAL09;  //요리 순서
        private String MANUAL10;  //요리 순서
        private String MANUAL11;  //요리 순서
        private String MANUAL12;  //요리 순서
        private String MANUAL13;  //요리 순서
        private String MANUAL14;  //요리 순서
        private String MANUAL15;  //요리 순서
        private String MANUAL16;  //요리 순서
        private String MANUAL17;  //요리 순서
        private String MANUAL18;  //요리 순서
        private String MANUAL19;  //요리 순서
        private String MANUAL20;  //요리 순서

        private String MANUAL_IMG01;  //요리 순서 사진
        private String MANUAL_IMG02;  //요리 순서 사진
        private String MANUAL_IMG03;  //요리 순서 사진
        private String MANUAL_IMG04;  //요리 순서 사진
        private String MANUAL_IMG05;  //요리 순서 사진
        private String MANUAL_IMG06;  //요리 순서 사진
        private String MANUAL_IMG07;  //요리 순서 사진
        private String MANUAL_IMG08;  //요리 순서 사진
        private String MANUAL_IMG09;  //요리 순서 사진
        private String MANUAL_IMG10;  //요리 순서 사진
        private String MANUAL_IMG11;  //요리 순서 사진
        private String MANUAL_IMG12;  //요리 순서 사진
        private String MANUAL_IMG13;  //요리 순서 사진
        private String MANUAL_IMG14;  //요리 순서 사진
        private String MANUAL_IMG15;  //요리 순서 사진
        private String MANUAL_IMG16;  //요리 순서 사진
        private String MANUAL_IMG17;  //요리 순서 사진
        private String MANUAL_IMG18;  //요리 순서 사진
        private String MANUAL_IMG19;  //요리 순서 사진
        private String MANUAL_IMG20;  //요리 순서 사진

        private String INFO_WGT;  // 중량 (1인분)
        private String INFO_ENG;  // 열량
        private String INFO_CAR;  // 탄수화물
        private String INFO_PRO;  // 단백질
        private String INFO_FAT;  // 지방
        private String INFO_NA;  // 나트륨

        private String HASH_TAG;  // 해쉬태그

}


