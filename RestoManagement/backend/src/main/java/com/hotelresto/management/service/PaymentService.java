package com.hotelresto.management.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
public class PaymentService {

    public PaymentService() {}

    /**
     * Mock Stripe-like payment simulation.
     * In production, this would integrate with Stripe API.
     */
    public Map<String, String> processPayment(double amount, String paymentMethod) {
        // Simulate a successful payment
        boolean isSuccess = Math.random() > 0.1; // 90% success rate
        
        if (isSuccess) {
            return Map.of(
                "status", "SUCCESS",
                "transactionId", "txn_" + UUID.randomUUID().toString().substring(0, 12),
                "message", "Payment processed successfully"
            );
        } else {
            return Map.of(
                "status", "FAILED",
                "message", "Payment failed. Please check your card details."
            );
        }
    }
}
