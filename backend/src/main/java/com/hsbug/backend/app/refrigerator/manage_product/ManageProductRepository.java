package com.hsbug.backend.app.refrigerator.manage_product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManageProductRepository extends JpaRepository<ManageProductEntity,Long> {

    List<ManageProductEntity> findAllByEmail(String email);
}
