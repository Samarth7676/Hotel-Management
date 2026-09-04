package com.hotelresto.management.repository;

import com.hotelresto.management.model.Category;
import com.hotelresto.management.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategory(Category category);
    List<MenuItem> findByAvailable(boolean available);
}
