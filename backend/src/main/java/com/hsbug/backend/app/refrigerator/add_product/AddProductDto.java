package com.hsbug.backend.app.refrigerator.add_product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddProductDto {

    private String username;
    private String barcode;  //String이 나을듯?
    private String product_name;
    private String product_type ;
    private Integer product_num;
    private String exp_date;   // 유통기한 직접 입력 데이터 타입 수정 해야함.
    private String input_date; //  오늘 local 날짜로 지정
}
