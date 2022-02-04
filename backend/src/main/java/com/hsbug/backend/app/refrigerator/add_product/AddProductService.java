package com.hsbug.backend.app.refrigerator.add_product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class AddProductService {
    private final AddProductRepository addProductRepository;

    @Transactional
    public void save(AddProductDto addProductDto) {
        addProductRepository.save(addProductDto.toEntity());
    }
}
