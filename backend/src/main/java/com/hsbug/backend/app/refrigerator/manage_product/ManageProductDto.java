package com.hsbug.backend.app.refrigerator.manage_product;

import lombok.*;


@Data
@Getter
@Setter
public class ManageProductDto {
    private Long id;
    private String email;
    private String barcode;  //String이 나을듯?
    private String itemName;
    private String product_type ;
    private Integer itemAmount;
    private String itemExp;   // 유통기한 직접 입력 데이터 타입 수정 해야함.
    private String itemReg; //  오늘 local 날짜로 지정
    private Integer itemRemainingDate;
    private String itemImage;

    @Builder
    public ManageProductDto(Long id, String email, String barcode, String product_type, String itemName, String itemExp, Integer itemAmount, String itemReg, Integer itemRemainingDate, String itemImage){
        this.id=id;
        this.email=email;
        this.barcode=barcode;
        this.itemName=itemName;
        this.product_type=product_type;
        this.itemAmount=itemAmount;
        this.itemExp=itemExp;
        this.itemReg=itemReg;
        this.itemRemainingDate=itemRemainingDate;
        this.itemImage = itemImage;
    }

    public ManageProductDto() {

    }

    public ManageProductEntity toEntity(){
        return ManageProductEntity.builder()
                .email(email)
                .barcode(barcode)
                .itemName(itemName)
                .itemAmount(itemAmount)
                .product_type(product_type)
                .itemExp(itemExp)
                .itemReg(itemReg)
                .itemRemainingDate(itemRemainingDate)
                .itemImage(itemImage)
                .build();
    }
}

