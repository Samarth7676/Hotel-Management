package com.hotelresto.management.ai;

import com.hotelresto.management.dto.MenuItemDTO;
import com.hotelresto.management.model.MenuItem;
import com.hotelresto.management.repository.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final MenuItemRepository menuItemRepository;

    public RecommendationService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    /**
     * Simple rule-based recommendation logic for demonstration.
     * In production, this would integrate with an ML model or AI API.
     */
    public List<MenuItemDTO> recommendForUser(Long userId) {
        // Mock recommendation: recommend items that are available and have price > 10
        return menuItemRepository.findByAvailable(true).stream()
                .filter(item -> item.getPrice().doubleValue() > 10.0)
                .limit(3)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private MenuItemDTO convertToDTO(MenuItem item) {
        return MenuItemDTO.builder()
                .id(item.getId())
                .categoryId(item.getCategory().getId())
                .categoryName(item.getCategory().getName())
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .imageUrl(item.getImageUrl())
                .available(item.isAvailable())
                .build();
    }
}
