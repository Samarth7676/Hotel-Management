package com.hotelresto.management.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String itemName;

    @Column(nullable = false)
    private BigDecimal quantity;

    @Column(nullable = false)
    private String unit;

    @Column(nullable = false)
    private BigDecimal reorderLevel;

    public Inventory() {}

    public Inventory(Long id, String itemName, BigDecimal quantity, String unit, BigDecimal reorderLevel) {
        this.id = id;
        this.itemName = itemName;
        this.quantity = quantity;
        this.unit = unit;
        this.reorderLevel = reorderLevel;
    }

    public static InventoryBuilder builder() {
        return new InventoryBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public BigDecimal getQuantity() { return quantity; }
    public void setQuantity(BigDecimal quantity) { this.quantity = quantity; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public BigDecimal getReorderLevel() { return reorderLevel; }
    public void setReorderLevel(BigDecimal reorderLevel) { this.reorderLevel = reorderLevel; }

    public static class InventoryBuilder {
        private Long id;
        private String itemName;
        private BigDecimal quantity;
        private String unit;
        private BigDecimal reorderLevel;

        public InventoryBuilder id(Long id) { this.id = id; return this; }
        public InventoryBuilder itemName(String itemName) { this.itemName = itemName; return this; }
        public InventoryBuilder quantity(BigDecimal quantity) { this.quantity = quantity; return this; }
        public InventoryBuilder unit(String unit) { this.unit = unit; return this; }
        public InventoryBuilder reorderLevel(BigDecimal reorderLevel) { this.reorderLevel = reorderLevel; return this; }

        public Inventory build() {
            return new Inventory(id, itemName, quantity, unit, reorderLevel);
        }
    }
}
