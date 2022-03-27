package com.hsbug.backend.admin_page.manage_recipe;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
public class ManageRecipeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    private String WRITER;
    private String RCP_SEQ;  // 레시피 번호
    private String RCP_NM;    // 레시피 이름
    private String RCP_PAT2;  // 요리 종류
    @Column(length=600)
    private String RCPPARTSDTLS;  // 재료 정보
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
    //private String MANUAL16;  //요리 순서 json Null 값
    //private String MANUAL17;  //요리 순서 json Null 값
    //private String MANUAL18;  //요리 순서 json Null 값
    //private String MANUAL19;  //요리 순서 json Null 값
    //private String MANUAL20;  //요리 순서 json Null 값

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
    //private String MANUAL_IMG12;  //요리 순서 사진 json Null 값
    //private String MANUAL_IMG13;  //요리 순서 사진 json Null 값
    //private String MANUAL_IMG14;  //요리 순서 사진 json Null 값
    //private String MANUAL_IMG15;  //요리 순서 사진 json Null 값
    //private String MANUAL_IMG16;  //요리 순서 사진 json Null 값
    //private String MANUAL_IMG17;  //요리 순서 사진 json Null 값
    //private String MANUAL_IMG18;  //요리 순서 사진 json Null 값
    //private String MANUAL_IMG19;  //요리 순서 사진 json Null 값
    //private String MANUAL_IMG20;  //요리 순서 사진 json Null 값

    //private String INFO_WGT;  // 중량 (1인분)  json Null 값
    private String INFO_ENG;  // 열량
    private String INFO_CAR;  // 탄수화물
    private String INFO_PRO;  // 단백질
    private String INFO_FAT;  // 지방
    private String INFO_NA;  // 나트륨

    private String HASH_TAG;  // 해쉬태그
    @Column(updatable = false)  // 업데이트 시 초기화 불가능
    private Integer views;
    @Column(updatable = false)
    private Integer stars;
    @Column(updatable = false)
    private Integer likes;
    private String ADD_TIME;

    @Builder
    public ManageRecipeEntity(Long RCP_ID, String RCP_SEQ, String RCP_NM,String RCP_PAT2, String RCPPARTSDTLS, String RCP_WAY2
            , String ATT_FILE_NO_MAIN, String ATT_FILE_NO_MK, String MANUAL01, String MANUAL02, String MANUAL03, String MANUAL04
            , String MANUAL05, String MANUAL06, String MANUAL07, String MANUAL08, String MANUAL09, String MANUAL10, String MANUAL11
            , String MANUAL12, String MANUAL_IMG01, String MANUAL_IMG02, String MANUAL_IMG03, String MANUAL_IMG04, String MANUAL_IMG05
            , String MANUAL_IMG06, String MANUAL_IMG07, String MANUAL_IMG08, String MANUAL_IMG09, String MANUAL_IMG10, String MANUAL_IMG11
            , String INFO_CAR, String INFO_ENG, String INFO_FAT, String INFO_NA, String INFO_PRO,  String HASH_TAG
            , String MANUAL13, String MANUAL14, String MANUAL15, String WRITER,Integer views, Integer stars, Integer likes, String ADD_TIME){
        //String MANUAL16, String MANUAL17, String MANUAL18, String MANUAL19, String MANUAL20, String INFO_WGT, String MANUAL_IMG12, String MANUAL_IMG13,
        //String MANUAL_IMG14, String MANUAL_IMG15, String MANUAL_IMG16, String MANUAL_IMG17, String MANUAL_IMG18, String MANUAL_IMG19, String MANUAL_IMG20
        this.id=RCP_ID;
        this.RCP_SEQ=RCP_SEQ;
        this.RCP_NM=RCP_NM; this.RCP_PAT2=RCP_PAT2; this.RCP_WAY2=RCP_WAY2;
        this.ATT_FILE_NO_MAIN=ATT_FILE_NO_MAIN; this.ATT_FILE_NO_MK=ATT_FILE_NO_MK; this.RCPPARTSDTLS = RCPPARTSDTLS; this.MANUAL01=MANUAL01;
        this.MANUAL02=MANUAL02; this.MANUAL03=MANUAL03; this.MANUAL04=MANUAL04; this.MANUAL05=MANUAL05; this.MANUAL06=MANUAL06; this.MANUAL07=MANUAL07; this.MANUAL08=MANUAL08; this.MANUAL09=MANUAL09; this.MANUAL10=MANUAL10;
        this.MANUAL11=MANUAL11; this.MANUAL12=MANUAL12; this.MANUAL_IMG01=MANUAL_IMG01; this.MANUAL_IMG02=MANUAL_IMG02; this.MANUAL_IMG03=MANUAL_IMG03; this.MANUAL_IMG04=MANUAL_IMG04; this.MANUAL_IMG05=MANUAL_IMG05; this.MANUAL_IMG06=MANUAL_IMG06; this.MANUAL_IMG07=MANUAL_IMG07; this.MANUAL_IMG08=MANUAL_IMG08; this.MANUAL_IMG09=MANUAL_IMG09; this.MANUAL_IMG10=MANUAL_IMG10; this.MANUAL_IMG11=MANUAL_IMG11;
        this.INFO_ENG=INFO_ENG; this.INFO_CAR=INFO_CAR; this.INFO_PRO = INFO_PRO; this.INFO_FAT=INFO_FAT; this.INFO_NA=INFO_NA; this.HASH_TAG=HASH_TAG;
        this.MANUAL13=MANUAL13;this.MANUAL14=MANUAL14;this.MANUAL15=MANUAL15; this.ADD_TIME=ADD_TIME; this.WRITER=WRITER;this.stars=stars; this.likes=likes;// this.views=views;
        //this.MANUAL16=MANUAL16;this.MANUAL17=MANUAL17;this.MANUAL18=MANUAL18;this.MANUAL19=MANUAL19;this.MANUAL20=MANUAL20;this.INFO_WGT=INFO_WGT;
        //this.MANUAL_IMG12=MANUAL_IMG12; this.MANUAL_IMG13=MANUAL_IMG13;this.MANUAL_IMG14=MANUAL_IMG14;this.MANUAL_IMG15=MANUAL_IMG15;this.MANUAL_IMG16=MANUAL_IMG16;this.MANUAL_IMG17=MANUAL_IMG17;this.MANUAL_IMG18=MANUAL_IMG18;this.MANUAL_IMG19=MANUAL_IMG19;this.MANUAL_IMG20=MANUAL_IMG20;
    }

    public ManageRecipeEntity() {

    }
}
