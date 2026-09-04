package com.hotelresto.management.dto;

import com.hotelresto.management.model.RoomStatus;
import com.hotelresto.management.model.RoomType;
import java.math.BigDecimal;

public class RoomDTO {
    private Long id;
    private String roomNumber;
    private RoomType roomType;
    private BigDecimal pricePerNight;
    private RoomStatus status;
    private String description;
    private String imageUrl;

    public RoomDTO() {}

    public RoomDTO(Long id, String roomNumber, RoomType roomType, BigDecimal pricePerNight, RoomStatus status, String description, String imageUrl) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.pricePerNight = pricePerNight;
        this.status = status;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public static RoomDTOBuilder builder() {
        return new RoomDTOBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public RoomType getRoomType() { return roomType; }
    public void setRoomType(RoomType roomType) { this.roomType = roomType; }
    public BigDecimal getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(BigDecimal pricePerNight) { this.pricePerNight = pricePerNight; }
    public RoomStatus getStatus() { return status; }
    public void setStatus(RoomStatus status) { this.status = status; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public static class RoomDTOBuilder {
        private Long id;
        private String roomNumber;
        private RoomType roomType;
        private BigDecimal pricePerNight;
        private RoomStatus status;
        private String description;
        private String imageUrl;

        public RoomDTOBuilder id(Long id) { this.id = id; return this; }
        public RoomDTOBuilder roomNumber(String roomNumber) { this.roomNumber = roomNumber; return this; }
        public RoomDTOBuilder roomType(RoomType roomType) { this.roomType = roomType; return this; }
        public RoomDTOBuilder pricePerNight(BigDecimal pricePerNight) { this.pricePerNight = pricePerNight; return this; }
        public RoomDTOBuilder status(RoomStatus status) { this.status = status; return this; }
        public RoomDTOBuilder description(String description) { this.description = description; return this; }
        public RoomDTOBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }

        public RoomDTO build() {
            return new RoomDTO(id, roomNumber, roomType, pricePerNight, status, description, imageUrl);
        }
    }
}
