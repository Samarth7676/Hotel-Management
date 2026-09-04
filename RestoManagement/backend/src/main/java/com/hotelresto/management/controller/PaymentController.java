package com.hotelresto.management.controller;

import com.hotelresto.management.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
@Tag(name = "Payment System", description = "Mock payment gateway APIs")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @Operation(summary = "Process a mock payment (Stripe simulation)")
    @PostMapping("/process")
    public ResponseEntity<Map<String, String>> processPayment(@RequestBody Map<String, Object> request) {
        double amount = (double) request.get("amount");
        String method = (String) request.get("paymentMethod");
        return ResponseEntity.ok(paymentService.processPayment(amount, method));
    }
}
