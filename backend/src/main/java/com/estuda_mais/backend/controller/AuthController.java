package com.estuda_mais.backend.controller;

import com.estuda_mais.backend.dto.AuthResponse;
import com.estuda_mais.backend.dto.LoginRequest;
import com.estuda_mais.backend.dto.RegisterRequest;
import com.estuda_mais.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        AuthResponse response = authService.register(registerRequest);
        
        if (response.isSuccess()) {
            return ResponseEntity.status(201).body(response);
        } else {
            return ResponseEntity.status(400).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.login(loginRequest);
        
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // JWT is stateless, so we just return success
        // The frontend should remove the token from storage
        AuthResponse response = new AuthResponse(true, "Logout successful");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(new AuthResponse(false, "Not authenticated"));
        }
        
        String email = authentication.getName();
        AuthResponse response = authService.getCurrentUser(email);
        
        return ResponseEntity.ok(response);
    }
}