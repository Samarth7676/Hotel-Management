package com.hotelresto.management.repository;

import com.hotelresto.management.model.Booking;
import com.hotelresto.management.model.BookingStatus;
import com.hotelresto.management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByStatus(BookingStatus status);
    List<Booking> findByCheckInDateBetween(LocalDate start, LocalDate end);
}
