package com.hotelresto.management.config;

import com.hotelresto.management.model.Role;
import com.hotelresto.management.model.User;
import com.hotelresto.management.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "hotel@resto.com";
            if (!userRepository.findByEmail(adminEmail).isPresent()) {
                User admin = User.builder()
                        .username("admin")
                        .email(adminEmail)
                        .password(passwordEncoder.encode("admin@123"))
                        .role(Role.ADMIN)
                        .fullName("System Admin")
                        .build();
                userRepository.save(admin);
                System.out.println("Default admin user created: hotel@resto.com / admin@123");
            }
        };
    }
}
