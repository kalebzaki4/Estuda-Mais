package com.estudamais.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Método de login com retorno JSON
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        if ("teste".equals(loginRequest.getUsername()) && "12345".equals(loginRequest.getPassword())) {
            LoginResponse response = new LoginResponse("Login bem-sucedido!", loginRequest.getUsername());
            return ResponseEntity.ok(response);
        } else {
            LoginResponse errorResponse = new LoginResponse("Credenciais inválidas.", null);
            return ResponseEntity.status(401).body(errorResponse);
        }
    }

    // Método de registro, agora retornando um JSON com status 201 Created
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (registerRequest.getUsername() == null || registerRequest.getUsername().isEmpty()
                || registerRequest.getPassword() == null || registerRequest.getPassword().isEmpty()
                || registerRequest.getEmail() == null || registerRequest.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Todos os campos são obrigatórios.");
        }

        RegisterResponse response = new RegisterResponse("Usuário cadastrado com sucesso!", registerRequest.getUsername());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}

class LoginRequest {
    private String username;
    private String password;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

class LoginResponse {
    private String message;
    private String user;

    public LoginResponse(String message, String user) {
        this.message = message;
        this.user = user;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }
}

class RegisterRequest {
    private String username;
    private String email;
    private String password;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

class RegisterResponse {
    private String message;
    private String username;

    public RegisterResponse(String message, String username) {
        this.message = message;
        this.username = username;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
