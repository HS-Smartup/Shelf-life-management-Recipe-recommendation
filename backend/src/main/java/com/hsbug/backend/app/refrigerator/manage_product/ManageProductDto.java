package com.hsbug.backend.app.refrigerator.manage_product;

import lombok.*;

@Data
@Getter
@Setter
public class ManageProductDto {
    private Long id;
    private String email;
    private String barcode;  //String이 나을듯?
    private String product_name;
    private String product_type ;
    private Integer product_num;
    private String exp_date;   // 유통기한 직접 입력 데이터 타입 수정 해야함.
    private String input_date; //  오늘 local 날짜로 지정

    @Builder
    public ManageProductDto(Long id, String email, String barcode, String product_type, String product_name, String exp_date, Integer product_num, String input_date){
        this.id=id;
        this.email=email;
        this.barcode=barcode;
        this.product_name=product_name;
        this.product_type=product_type;
        this.product_num=product_num;
        this.exp_date=exp_date;
        this.input_date=input_date;
    }

    public ManageProductDto() {

    }

    public ManageProductEntity toEntity(){
        return ManageProductEntity.builder()
                .email(email)
                .barcode(barcode)
                .product_name(product_name)
                .product_num(product_num)
                .product_type(product_type)
                .exp_date(exp_date)
                .input_date(input_date)
                .build();
    }
}

