package com.hotelresto.management.repository;

import com.hotelresto.management.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
