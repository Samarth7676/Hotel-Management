package com.hotelresto.management.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String roomNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomType roomType;

    @Column(nullable = false)
    private BigDecimal pricePerNight;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomStatus status;

    private String description;

    private String imageUrl;

    public Room() {}

    public Room(Long id, String roomNumber, RoomType roomType, BigDecimal pricePerNight, RoomStatus status, String description, String imageUrl) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.pricePerNight = pricePerNight;
        this.status = status;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public static RoomBuilder builder() {
        return new RoomBuilder();
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

    public static class RoomBuilder {
        private Long id;
        private String roomNumber;
        private RoomType roomType;
        private BigDecimal pricePerNight;
        private RoomStatus status;
        private String description;
        private String imageUrl;

        public RoomBuilder id(Long id) { this.id = id; return this; }
        public RoomBuilder roomNumber(String roomNumber) { this.roomNumber = roomNumber; return this; }
        public RoomBuilder roomType(RoomType roomType) { this.roomType = roomType; return this; }
        public RoomBuilder pricePerNight(BigDecimal pricePerNight) { this.pricePerNight = pricePerNight; return this; }
        public RoomBuilder status(RoomStatus status) { this.status = status; return this; }
        public RoomBuilder description(String description) { this.description = description; return this; }
        public RoomBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }

        public Room build() {
            return new Room(id, roomNumber, roomType, pricePerNight, status, description, imageUrl);
        }
    }
}
