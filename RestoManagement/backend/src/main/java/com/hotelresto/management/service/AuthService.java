package com.hotelresto.management.service;

import com.hotelresto.management.dto.AuthResponse;
import com.hotelresto.management.dto.LoginRequest;
import com.hotelresto.management.model.User;
import com.hotelresto.management.repository.UserRepository;
import com.hotelresto.management.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository repository, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user = repository.findByUsername(request.getUsername())
                .or(() -> repository.findByEmail(request.getUsername()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }

    public AuthResponse register(User user) {
        if (repository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (repository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        User savedUser = repository.save(user);
        String jwtToken = jwtService.generateToken(savedUser);
        return AuthResponse.builder()
                .token(jwtToken)
                .username(savedUser.getUsername())
                .role(savedUser.getRole())
                .build();
    }
}
