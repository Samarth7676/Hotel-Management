package com.hotelresto.management.dto;

import java.math.BigDecimal;

public class MenuItemDTO {
    private Long id;
    private Long categoryId;
    private String categoryName;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private boolean available;

    public MenuItemDTO() {}

    public MenuItemDTO(Long id, Long categoryId, String categoryName, String name, String description, BigDecimal price, String imageUrl, boolean available) {
        this.id = id;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.available = available;
    }

    public static MenuItemDTOBuilder builder() {
        return new MenuItemDTOBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public static class MenuItemDTOBuilder {
        private Long id;
        private Long categoryId;
        private String categoryName;
        private String name;
        private String description;
        private BigDecimal price;
        private String imageUrl;
        private boolean available;

        public MenuItemDTOBuilder id(Long id) { this.id = id; return this; }
        public MenuItemDTOBuilder categoryId(Long categoryId) { this.categoryId = categoryId; return this; }
        public MenuItemDTOBuilder categoryName(String categoryName) { this.categoryName = categoryName; return this; }
        public MenuItemDTOBuilder name(String name) { this.name = name; return this; }
        public MenuItemDTOBuilder description(String description) { this.description = description; return this; }
        public MenuItemDTOBuilder price(BigDecimal price) { this.price = price; return this; }
        public MenuItemDTOBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public MenuItemDTOBuilder available(boolean available) { this.available = available; return this; }

        public MenuItemDTO build() {
            return new MenuItemDTO(id, categoryId, categoryName, name, description, price, imageUrl, available);
        }
    }
}
