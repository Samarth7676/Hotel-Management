package com.hotelresto.management.repository;

import com.hotelresto.management.model.Room;
import com.hotelresto.management.model.RoomStatus;
import com.hotelresto.management.model.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByStatus(RoomStatus status);
    List<Room> findByRoomType(RoomType roomType);
    Optional<Room> findByRoomNumber(String roomNumber);
}
