package com.estuda_mais.backend.service;

import com.estuda_mais.backend.dto.AuthResponse;
import com.estuda_mais.backend.dto.LoginRequest;
import com.estuda_mais.backend.dto.RegisterRequest;
import com.estuda_mais.backend.dto.UserResponse;
import com.estuda_mais.backend.model.Usuario;
import com.estuda_mais.backend.repository.UsuarioRepository;
import com.estuda_mais.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest registerRequest) {
        // Check if email already exists
        if (usuarioRepository.existsByEmail(registerRequest.getEmail())) {
            return new AuthResponse(false, "Email already exists");
        }

        // Create new user
        Usuario usuario = new Usuario();
        usuario.setName(registerRequest.getName());
        usuario.setEmail(registerRequest.getEmail());
        usuario.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));

        Usuario savedUsuario = usuarioRepository.save(usuario);

        // Generate JWT token
        String token = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(
                savedUsuario.getEmail(), savedUsuario.getPasswordHash(), java.util.Collections.emptyList()));

        // Create response
        UserResponse userResponse = new UserResponse(
                savedUsuario.getId(),
                savedUsuario.getName(),
                savedUsuario.getEmail(),
                savedUsuario.getCreatedAt()
        );

        return new AuthResponse(true, "User registered successfully", userResponse, token, "24h");
    }

    public AuthResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Get user details
            Usuario usuario = usuarioRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Generate JWT token
            String token = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(
                    usuario.getEmail(), usuario.getPasswordHash(), java.util.Collections.emptyList()));

            // Create response
            UserResponse userResponse = new UserResponse(
                    usuario.getId(),
                    usuario.getName(),
                    usuario.getEmail(),
                    usuario.getCreatedAt()
            );

            return new AuthResponse(true, "Login successful", userResponse, token, "24h");
        } catch (Exception e) {
            return new AuthResponse(false, "Invalid credentials");
        }
    }

    public AuthResponse getCurrentUser(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserResponse userResponse = new UserResponse(
                usuario.getId(),
                usuario.getName(),
                usuario.getEmail(),
                usuario.getCreatedAt()
        );

        return new AuthResponse(true, "User retrieved successfully", userResponse, null, null);
    }
}