package com.hotelresto.management.ai;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatbotService {

    private static final Map<String, String> responses = new HashMap<>();

    static {
        responses.put("hello", "Hello! Welcome to Hotel & Resto Management. How can I assist you today?");
        responses.put("book room", "You can book a room from the 'Rooms' section in your dashboard.");
        responses.put("order food", "Check out our 'Menu' to order delicious food directly to your room or for takeaway.");
        responses.put("help", "I can help you with room bookings, food ordering, and account management.");
        responses.put("contact", "You can reach us at support@hotelresto.com or call +123456789.");
    }

    /**
     * Basic rule-based chatbot for demonstration.
     * In production, this would integrate with a real LLM like Gemini or OpenAI.
     */
    public String getResponse(String message) {
        String query = message.toLowerCase().trim();
        for (String key : responses.keySet()) {
            if (query.contains(key)) {
                return responses.get(key);
            }
        }
        return "I'm sorry, I didn't quite understand that. Can you please rephrase or ask about room bookings or food ordering?";
    }
}
