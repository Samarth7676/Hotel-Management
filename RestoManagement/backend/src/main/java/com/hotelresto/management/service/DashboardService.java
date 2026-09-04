package com.hotelresto.management.service;

import com.hotelresto.management.dto.DashboardDTO;
import com.hotelresto.management.model.Booking;
import com.hotelresto.management.model.Order;
import com.hotelresto.management.model.RoomStatus;
import com.hotelresto.management.repository.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;
    private final OrderRepository orderRepository;

    public DashboardService(UserRepository userRepository, RoomRepository roomRepository, BookingRepository bookingRepository, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
        this.orderRepository = orderRepository;
    }

    public DashboardDTO getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalRooms = roomRepository.count();
        long availableRooms = roomRepository.findByStatus(RoomStatus.AVAILABLE).size();
        long totalBookings = bookingRepository.count();

        List<Order> orders = orderRepository.findAll();
        long pendingOrders = orders.stream()
                .filter(o -> o.getStatus().name().equals("PENDING"))
                .count();

        BigDecimal totalOrderRevenue = orders.stream()
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalBookingRevenue = bookingRepository.findAll().stream()
                .map(Booking::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalRevenue = totalOrderRevenue.add(totalBookingRevenue);

        // Simple aggregation for chart data
        Map<String, Long> bookingsByType = roomRepository.findAll().stream()
                .collect(Collectors.groupingBy(r -> r.getRoomType().name(), Collectors.counting()));

        return DashboardDTO.builder()
                .totalUsers(totalUsers)
                .totalRooms(totalRooms)
                .availableRooms(availableRooms)
                .totalBookings(totalBookings)
                .pendingOrders(pendingOrders)
                .totalRevenue(totalRevenue)
                .bookingsByType(bookingsByType)
                .revenueByMonth(new HashMap<>()) // To be implemented with actual month logic
                .build();
    }
}
