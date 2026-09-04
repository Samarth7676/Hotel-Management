package com.hotelresto.management.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank
    private String username;
    @NotBlank
    private String password;

    public LoginRequest() {}

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public static LoginRequestBuilder builder() {
        return new LoginRequestBuilder();
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public static class LoginRequestBuilder {
        private String username;
        private String password;

        public LoginRequestBuilder username(String username) { this.username = username; return this; }
        public LoginRequestBuilder password(String password) { this.password = password; return this; }

        public LoginRequest build() {
            return new LoginRequest(username, password);
        }
    }
}
