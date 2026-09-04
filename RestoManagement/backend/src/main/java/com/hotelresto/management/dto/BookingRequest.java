package com.hotelresto.management.dto;

import java.time.LocalDate;

public class BookingRequest {
    private Long roomId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    public BookingRequest() {}

    public BookingRequest(Long roomId, LocalDate checkInDate, LocalDate checkOutDate) {
        this.roomId = roomId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
    }

    public static BookingRequestBuilder builder() {
        return new BookingRequestBuilder();
    }

    // Getters and Setters
    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }
    public LocalDate getCheckInDate() { return checkInDate; }
    public void setCheckInDate(LocalDate checkInDate) { this.checkInDate = checkInDate; }
    public LocalDate getCheckOutDate() { return checkOutDate; }
    public void setCheckOutDate(LocalDate checkOutDate) { this.checkOutDate = checkOutDate; }

    public static class BookingRequestBuilder {
        private Long roomId;
        private LocalDate checkInDate;
        private LocalDate checkOutDate;

        public BookingRequestBuilder roomId(Long roomId) { this.roomId = roomId; return this; }
        public BookingRequestBuilder checkInDate(LocalDate checkInDate) { this.checkInDate = checkInDate; return this; }
        public BookingRequestBuilder checkOutDate(LocalDate checkOutDate) { this.checkOutDate = checkOutDate; return this; }

        public BookingRequest build() {
            return new BookingRequest(roomId, checkInDate, checkOutDate);
        }
    }
}
