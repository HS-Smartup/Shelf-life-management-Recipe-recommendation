package com.hsbug.backend.app.refrigerator.manage_product;

import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeDto;
import com.hsbug.backend.admin_page.manage_recipe.ManageRecipeEntity;
import com.hsbug.backend.app.refrigerator.add_product.AddProductDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ManageProductService {

    private final ManageProductRepository manageProductRepository;

    private AddProductDto convertEntityToDto(ManageProductEntity manageProductEntity){
        return AddProductDto.builder()
                .id(manageProductEntity.getId())
                .product_num(manageProductEntity.getProduct_num())
                .barcode(manageProductEntity.getBarcode())
                .email(manageProductEntity.getEmail())
                .exp_date(manageProductEntity.getExp_date())
                .input_date(manageProductEntity.getInput_date())
                .product_name(manageProductEntity.getProduct_name())
                .product_type(manageProductEntity.getProduct_type())
                .build();
    }

    @Transactional
    public List<AddProductDto> findProduct(String email) {
        List<ManageProductEntity> productEntities = manageProductRepository.findAllByEmail(email);
        List<AddProductDto> productDtoList = new ArrayList<>();

        for(ManageProductEntity manageProductEntity : productEntities){
            productDtoList.add(this.convertEntityToDto(manageProductEntity));
        }
        return productDtoList;
    }

    public void deleteProduct(Long id){
        manageProductRepository.deleteById(id);
    }
}
