package com.hsbug.backend.app.refrigerator.add_product;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class AddProductService {
    private final AddProductRepository addProductRepository;

    public AddProductService(AddProductRepository addProductRepository) {
        this.addProductRepository = addProductRepository;
    }

    @Transactional
    public void save(AddProductDto addProductDto) {
        addProductRepository.save(addProductDto.toEntity());
    }
}
