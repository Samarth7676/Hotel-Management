package com.hotelresto.management.dto;

import com.hotelresto.management.model.OrderType;
import java.util.List;

public class OrderRequest {
    private String tableNumber;
    private OrderType orderType;
    private List<OrderItemRequest> items;

    public OrderRequest() {}

    public OrderRequest(String tableNumber, OrderType orderType, List<OrderItemRequest> items) {
        this.tableNumber = tableNumber;
        this.orderType = orderType;
        this.items = items;
    }

    public static OrderRequestBuilder builder() {
        return new OrderRequestBuilder();
    }

    // Getters and Setters
    public String getTableNumber() { return tableNumber; }
    public void setTableNumber(String tableNumber) { this.tableNumber = tableNumber; }
    public OrderType getOrderType() { return orderType; }
    public void setOrderType(OrderType orderType) { this.orderType = orderType; }
    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }

    public static class OrderRequestBuilder {
        private String tableNumber;
        private OrderType orderType;
        private List<OrderItemRequest> items;

        public OrderRequestBuilder tableNumber(String tableNumber) { this.tableNumber = tableNumber; return this; }
        public OrderRequestBuilder orderType(OrderType orderType) { this.orderType = orderType; return this; }
        public OrderRequestBuilder items(List<OrderItemRequest> items) { this.items = items; return this; }

        public OrderRequest build() {
            return new OrderRequest(tableNumber, orderType, items);
        }
    }
}
