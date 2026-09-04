package com.hotelresto.management.dto;

public class OrderItemRequest {
    private Long menuItemId;
    private int quantity;

    public OrderItemRequest() {}

    public OrderItemRequest(Long menuItemId, int quantity) {
        this.menuItemId = menuItemId;
        this.quantity = quantity;
    }

    public static OrderItemRequestBuilder builder() {
        return new OrderItemRequestBuilder();
    }

    // Getters and Setters
    public Long getMenuItemId() { return menuItemId; }
    public void setMenuItemId(Long menuItemId) { this.menuItemId = menuItemId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public static class OrderItemRequestBuilder {
        private Long menuItemId;
        private int quantity;

        public OrderItemRequestBuilder menuItemId(Long menuItemId) { this.menuItemId = menuItemId; return this; }
        public OrderItemRequestBuilder quantity(int quantity) { this.quantity = quantity; return this; }

        public OrderItemRequest build() {
            return new OrderItemRequest(menuItemId, quantity);
        }
    }
}
