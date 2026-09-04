package com.hotelresto.management.ai;

import com.hotelresto.management.model.Room;
import com.hotelresto.management.model.RoomStatus;
import com.hotelresto.management.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PricingEngineService {

    private final RoomRepository roomRepository;

    public PricingEngineService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    /**
     * Smart pricing logic: Increase prices by 10% if room availability is low (less than 20% available).
     */
    public BigDecimal calculateSmartPrice(Room room) {
        long totalRooms = roomRepository.count();
        long availableRooms = roomRepository.findByStatus(RoomStatus.AVAILABLE).size();
        
        double availabilityRatio = (double) availableRooms / totalRooms;
        BigDecimal basePrice = room.getPricePerNight();
        
        if (availabilityRatio < 0.2) {
            return basePrice.multiply(BigDecimal.valueOf(1.10)); // 10% surge
        } else if (availabilityRatio > 0.8) {
            return basePrice.multiply(BigDecimal.valueOf(0.90)); // 10% discount
        }
        
        return basePrice;
    }
}
