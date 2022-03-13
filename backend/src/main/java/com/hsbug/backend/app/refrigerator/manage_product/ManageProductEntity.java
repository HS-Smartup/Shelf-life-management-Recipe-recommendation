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
    private String product_name;
    private String product_type ;
    private Integer product_num;
    private String exp_date;   // 유통기한 직접 입력 데이터 타입 수정 해야함.
    private String input_date; //  오늘 local 날짜로 지정

    @Builder
    public ManageProductEntity(Long id, String email, String barcode, String product_name, String product_type, String exp_date, String input_date, Integer product_num){
        this.id = id;
        this.email=email;
        this.barcode = barcode;
        this.product_name = product_name;
        this.product_num = product_num;
        this.product_type = product_type;
        this.exp_date = exp_date;
        this.input_date = input_date;
    }

    public void update(ManageProductDto dto) {
        this.email = dto.getEmail();
        this.barcode = dto.getBarcode();
        this.product_name = dto.getProduct_name();
        this.product_type = dto.getProduct_type();
        this.product_num = dto.getProduct_num();
        this.exp_date = dto.getExp_date();
        this.input_date = dto.getInput_date();
    }

}
