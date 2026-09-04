package com.hotelresto.management.service;

import com.hotelresto.management.dto.RoomDTO;
import com.hotelresto.management.model.Room;
import com.hotelresto.management.model.RoomStatus;
import com.hotelresto.management.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<RoomDTO> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<RoomDTO> getAvailableRooms() {
        return roomRepository.findByStatus(RoomStatus.AVAILABLE).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public RoomDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return convertToDTO(room);
    }

    public RoomDTO createRoom(RoomDTO roomDTO) {
        Room room = Room.builder()
                .roomNumber(roomDTO.getRoomNumber())
                .roomType(roomDTO.getRoomType())
                .pricePerNight(roomDTO.getPricePerNight())
                .status(roomDTO.getStatus() != null ? roomDTO.getStatus() : RoomStatus.AVAILABLE)
                .description(roomDTO.getDescription())
                .imageUrl(roomDTO.getImageUrl())
                .build();
        return convertToDTO(roomRepository.save(room));
    }

    public RoomDTO updateRoom(Long id, RoomDTO roomDTO) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        room.setRoomNumber(roomDTO.getRoomNumber());
        room.setRoomType(roomDTO.getRoomType());
        room.setPricePerNight(roomDTO.getPricePerNight());
        room.setStatus(roomDTO.getStatus());
        room.setDescription(roomDTO.getDescription());
        room.setImageUrl(roomDTO.getImageUrl());
        return convertToDTO(roomRepository.save(room));
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    private RoomDTO convertToDTO(Room room) {
        return RoomDTO.builder()
                .id(room.getId())
                .roomNumber(room.getRoomNumber())
                .roomType(room.getRoomType())
                .pricePerNight(room.getPricePerNight())
                .status(room.getStatus())
                .description(room.getDescription())
                .imageUrl(room.getImageUrl())
                .build();
    }
}
