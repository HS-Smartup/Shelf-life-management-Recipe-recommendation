package com.hsbug.backend.app.refrigerator.add_product;

import com.hsbug.backend.app.refrigerator.manage_refrigerator.ManageProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddProductRepository extends JpaRepository<ManageProductEntity,Long> {

}
