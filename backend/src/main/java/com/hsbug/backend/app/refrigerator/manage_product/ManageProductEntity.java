package com.hsbug.backend.app.refrigerator.manage_product;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ManageProductEntity {

    @Id @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    public ManageProductEntity(Long id, String email, String barcode, String itemName, String product_type, String itemExp, String itemReg, Integer itemAmount, Integer itemRemainingDate, String itemImage){
        this.id = id;
        this.email=email;
        this.barcode = barcode;
        this.itemName = itemName;
        this.itemAmount = itemAmount;
        this.product_type = product_type;
        this.itemExp = itemExp;
        this.itemReg = itemReg;
        this.itemRemainingDate = itemRemainingDate;
        this.itemImage = itemImage;
    }

    public void update(ManageProductDto dto) {
        this.email = dto.getEmail();
        this.barcode = dto.getBarcode();
        this.itemName = dto.getItemName();
        this.product_type = dto.getProduct_type();
        this.itemAmount = dto.getItemAmount();
        this.itemExp = dto.getItemExp();
        this.itemReg = dto.getItemReg();
        this.itemRemainingDate = dto.getItemRemainingDate();
        this.itemImage = dto.getItemImage();
    }

}
