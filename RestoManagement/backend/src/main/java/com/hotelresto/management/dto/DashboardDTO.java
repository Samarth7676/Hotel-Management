package com.hotelresto.management.dto;

import java.math.BigDecimal;
import java.util.Map;

public class DashboardDTO {
    private long totalUsers;
    private long totalRooms;
    private long availableRooms;
    private long totalBookings;
    private long pendingOrders;
    private BigDecimal totalRevenue;
    private Map<String, Long> bookingsByType;
    private Map<String, BigDecimal> revenueByMonth;

    public DashboardDTO() {}

    public DashboardDTO(long totalUsers, long totalRooms, long availableRooms, long totalBookings, long pendingOrders, BigDecimal totalRevenue, Map<String, Long> bookingsByType, Map<String, BigDecimal> revenueByMonth) {
        this.totalUsers = totalUsers;
        this.totalRooms = totalRooms;
        this.availableRooms = availableRooms;
        this.totalBookings = totalBookings;
        this.pendingOrders = pendingOrders;
        this.totalRevenue = totalRevenue;
        this.bookingsByType = bookingsByType;
        this.revenueByMonth = revenueByMonth;
    }

    public static DashboardDTOBuilder builder() {
        return new DashboardDTOBuilder();
    }

    // Getters and Setters
    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
    public long getTotalRooms() { return totalRooms; }
    public void setTotalRooms(long totalRooms) { this.totalRooms = totalRooms; }
    public long getAvailableRooms() { return availableRooms; }
    public void setAvailableRooms(long availableRooms) { this.availableRooms = availableRooms; }
    public long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(long totalBookings) { this.totalBookings = totalBookings; }
    public long getPendingOrders() { return pendingOrders; }
    public void setPendingOrders(long pendingOrders) { this.pendingOrders = pendingOrders; }
    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }
    public Map<String, Long> getBookingsByType() { return bookingsByType; }
    public void setBookingsByType(Map<String, Long> bookingsByType) { this.bookingsByType = bookingsByType; }
    public Map<String, BigDecimal> getRevenueByMonth() { return revenueByMonth; }
    public void setRevenueByMonth(Map<String, BigDecimal> revenueByMonth) { this.revenueByMonth = revenueByMonth; }

    public static class DashboardDTOBuilder {
        private long totalUsers;
        private long totalRooms;
        private long availableRooms;
        private long totalBookings;
        private long pendingOrders;
        private BigDecimal totalRevenue;
        private Map<String, Long> bookingsByType;
        private Map<String, BigDecimal> revenueByMonth;

        public DashboardDTOBuilder totalUsers(long totalUsers) { this.totalUsers = totalUsers; return this; }
        public DashboardDTOBuilder totalRooms(long totalRooms) { this.totalRooms = totalRooms; return this; }
        public DashboardDTOBuilder availableRooms(long availableRooms) { this.availableRooms = availableRooms; return this; }
        public DashboardDTOBuilder totalBookings(long totalBookings) { this.totalBookings = totalBookings; return this; }
        public DashboardDTOBuilder pendingOrders(long pendingOrders) { this.pendingOrders = pendingOrders; return this; }
        public DashboardDTOBuilder totalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; return this; }
        public DashboardDTOBuilder bookingsByType(Map<String, Long> bookingsByType) { this.bookingsByType = bookingsByType; return this; }
        public DashboardDTOBuilder revenueByMonth(Map<String, BigDecimal> revenueByMonth) { this.revenueByMonth = revenueByMonth; return this; }

        public DashboardDTO build() {
            return new DashboardDTO(totalUsers, totalRooms, availableRooms, totalBookings, pendingOrders, totalRevenue, bookingsByType, revenueByMonth);
        }
    }
}
