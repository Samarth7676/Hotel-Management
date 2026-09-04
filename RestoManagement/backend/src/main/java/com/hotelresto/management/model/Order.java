package com.hotelresto.management.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String tableNumber;

    @Column(nullable = false)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderType orderType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Order() {}

    public Order(Long id, User user, String tableNumber, BigDecimal totalAmount, OrderType orderType, OrderStatus status, List<OrderItem> items, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.tableNumber = tableNumber;
        this.totalAmount = totalAmount;
        this.orderType = orderType;
        this.status = status;
        this.items = items;
        this.createdAt = createdAt;
    }

    public static OrderBuilder builder() {
        return new OrderBuilder();
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getTableNumber() { return tableNumber; }
    public void setTableNumber(String tableNumber) { this.tableNumber = tableNumber; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public OrderType getOrderType() { return orderType; }
    public void setOrderType(OrderType orderType) { this.orderType = orderType; }
    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }
    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class OrderBuilder {
        private Long id;
        private User user;
        private String tableNumber;
        private BigDecimal totalAmount;
        private OrderType orderType;
        private OrderStatus status;
        private List<OrderItem> items;
        private LocalDateTime createdAt;

        public OrderBuilder id(Long id) { this.id = id; return this; }
        public OrderBuilder user(User user) { this.user = user; return this; }
        public OrderBuilder tableNumber(String tableNumber) { this.tableNumber = tableNumber; return this; }
        public OrderBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public OrderBuilder orderType(OrderType orderType) { this.orderType = orderType; return this; }
        public OrderBuilder status(OrderStatus status) { this.status = status; return this; }
        public OrderBuilder items(List<OrderItem> items) { this.items = items; return this; }
        public OrderBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Order build() {
            return new Order(id, user, tableNumber, totalAmount, orderType, status, items, createdAt);
        }
    }
}
