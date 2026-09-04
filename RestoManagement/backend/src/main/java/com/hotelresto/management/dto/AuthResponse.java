package com.hotelresto.management.dto;

import com.hotelresto.management.model.Role;

public class AuthResponse {
    private String token;
    private String username;
    private Role role;

    public AuthResponse() {}

    public AuthResponse(String token, String username, Role role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }

    public static AuthResponseBuilder builder() {
        return new AuthResponseBuilder();
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public static class AuthResponseBuilder {
        private String token;
        private String username;
        private Role role;

        public AuthResponseBuilder token(String token) { this.token = token; return this; }
        public AuthResponseBuilder username(String username) { this.username = username; return this; }
        public AuthResponseBuilder role(Role role) { this.role = role; return this; }

        public AuthResponse build() {
            return new AuthResponse(token, username, role);
        }
    }
}
