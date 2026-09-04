package com.hotelresto.management.controller;

import com.hotelresto.management.dto.BookingRequest;
import com.hotelresto.management.model.Booking;
import com.hotelresto.management.model.User;
import com.hotelresto.management.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@Tag(name = "Booking Management", description = "Hotel booking and availability APIs")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @Operation(summary = "Create a new booking")
    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @AuthenticationPrincipal User user,
            @RequestBody BookingRequest request
    ) {
        return ResponseEntity.ok(bookingService.createBooking(user, request));
    }

    @Operation(summary = "Get user's own bookings")
    @GetMapping("/my")
    public ResponseEntity<List<Booking>> getMyBookings(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(bookingService.getMyBookings(user));
    }

    @Operation(summary = "Get all bookings (Admin/Staff only)")
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @Operation(summary = "Cancel a booking")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok().build();
    }
}
