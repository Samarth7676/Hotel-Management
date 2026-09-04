package com.hotelresto.management.repository;

import com.hotelresto.management.model.Order;
import com.hotelresto.management.model.OrderStatus;
import com.hotelresto.management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> findByStatus(OrderStatus status);
}
