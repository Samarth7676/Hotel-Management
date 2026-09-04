package com.hotelresto.management.controller;

import com.hotelresto.management.ai.ChatbotService;
import com.hotelresto.management.ai.RecommendationService;
import com.hotelresto.management.dto.MenuItemDTO;
import com.hotelresto.management.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
@Tag(name = "AI Features", description = "AI-powered recommendations, pricing, and chatbot APIs")
public class AiController {

    private final RecommendationService recommendationService;
    private final ChatbotService chatbotService;

    public AiController(RecommendationService recommendationService, ChatbotService chatbotService) {
        this.recommendationService = recommendationService;
        this.chatbotService = chatbotService;
    }

    @Operation(summary = "Get food recommendations for the current user")
    @GetMapping("/recommendations")
    public ResponseEntity<List<MenuItemDTO>> getRecommendations(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(recommendationService.recommendForUser(user.getId()));
    }

    @Operation(summary = "Chat with AI bot")
    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        String response = chatbotService.getResponse(message);
        return ResponseEntity.ok(Map.of("response", response));
    }
}
