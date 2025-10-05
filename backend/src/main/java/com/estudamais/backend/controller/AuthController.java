package com.estudamais.backend.controller;

import com.estudamais.backend.dto.AuthRequest;
import com.estudamais.backend.dto.AuthResponse;
import com.estudamais.backend.dto.RegisterRequest;
import com.estudamais.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        // O método 'login' será implementado no AuthService após o JWT
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}