package com.estudamais.api_estudos.controller;

import com.estudamais.api_estudos.model.User;
import com.estudamais.api_estudos.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String email = payload.get("email");
        String password = payload.get("password");

        if (username == null || email == null || password == null || username.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return new ResponseEntity<>("Nome de usuário, email e senha são obrigatórios.", HttpStatus.BAD_REQUEST);
        }

        Optional<User> registeredUser = authService.registerUser(username, email, password);

        if (registeredUser.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", registeredUser.get().getId());
            response.put("username", registeredUser.get().getUsername());
            response.put("email", registeredUser.get().getEmail());
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Nome de usuário ou email já em uso.", HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");

        if (username == null || password == null || username.isEmpty() || password.isEmpty()) {
            return new ResponseEntity<>("Nome de usuário e senha são obrigatórios.", HttpStatus.BAD_REQUEST);
        }

        Optional<User> authenticatedUser = authService.authenticateUser(username, password);

        if (authenticatedUser.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login bem-sucedido!");
            response.put("user", authenticatedUser.get().getUsername());
            response.put("email", authenticatedUser.get().getEmail());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Credenciais inválidas.", HttpStatus.UNAUTHORIZED);
        }
    }
}