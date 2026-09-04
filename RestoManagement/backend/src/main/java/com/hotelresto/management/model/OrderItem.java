package com.hotelresto.management.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_item_id", nullable = false)
    private MenuItem menuItem;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private BigDecimal price;

    public OrderItem() {}

    public OrderItem(Long id, Order order, MenuItem menuItem, int quantity, BigDecimal price) {
        this.id = id;
        this.order = order;
        this.menuItem = menuItem;
        this.quantity = quantity;
        this.price = price;
    }

    public static OrderItemBuilder builder() {
        return new OrderItemBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    public MenuItem getMenuItem() { return menuItem; }
    public void setMenuItem(MenuItem menuItem) { this.menuItem = menuItem; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public static class OrderItemBuilder {
        private Long id;
        private Order order;
        private MenuItem menuItem;
        private int quantity;
        private BigDecimal price;

        public OrderItemBuilder id(Long id) { this.id = id; return this; }
        public OrderItemBuilder order(Order order) { this.order = order; return this; }
        public OrderItemBuilder menuItem(MenuItem menuItem) { this.menuItem = menuItem; return this; }
        public OrderItemBuilder quantity(int quantity) { this.quantity = quantity; return this; }
        public OrderItemBuilder price(BigDecimal price) { this.price = price; return this; }

        public OrderItem build() {
            return new OrderItem(id, order, menuItem, quantity, price);
        }
    }
}
