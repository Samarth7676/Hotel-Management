package com.hotelresto.management.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private String imageUrl;

    @Column(nullable = false)
    private boolean available = true;

    public MenuItem() {}

    public MenuItem(Long id, Category category, String name, String description, BigDecimal price, String imageUrl, boolean available) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.available = available;
    }

    public static MenuItemBuilder builder() {
        return new MenuItemBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
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

    public static class MenuItemBuilder {
        private Long id;
        private Category category;
        private String name;
        private String description;
        private BigDecimal price;
        private String imageUrl;
        private boolean available = true;

        public MenuItemBuilder id(Long id) { this.id = id; return this; }
        public MenuItemBuilder category(Category category) { this.category = category; return this; }
        public MenuItemBuilder name(String name) { this.name = name; return this; }
        public MenuItemBuilder description(String description) { this.description = description; return this; }
        public MenuItemBuilder price(BigDecimal price) { this.price = price; return this; }
        public MenuItemBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public MenuItemBuilder available(boolean available) { this.available = available; return this; }

        public MenuItem build() {
            return new MenuItem(id, category, name, description, price, imageUrl, available);
        }
    }
}
