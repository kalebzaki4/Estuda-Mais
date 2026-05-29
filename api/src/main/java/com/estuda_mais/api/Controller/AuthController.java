package com.estuda_mais.api.controller;

import com.estuda_mais.api.dto.LoginRequestDTO;
import com.estuda_mais.api.dto.RegisterRequestDTO;
import com.estuda_mais.api.dto.UsuarioResponseDTO;
import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.service.TokenService;
import com.estuda_mais.api.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final TokenService tokenService;

    private final UsuarioService usuarioService;

    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(TokenService tokenService, UsuarioService usuarioService, AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.usuarioService = usuarioService;
        this.authenticationManager = authenticationManager;
    }

    // fazer login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginRequestDTO loginRequestDTO) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(loginRequestDTO.email(), loginRequestDTO.password());
        var authentication = authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((Usuario) authentication.getPrincipal());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity<UsuarioResponseDTO> register(@RequestBody @Valid RegisterRequestDTO dto) {

        Usuario usuarioSalvo = usuarioService.save(dto);

        UsuarioResponseDTO response = new UsuarioResponseDTO(
                usuarioSalvo.getId(),
                usuarioSalvo.getName(),
                usuarioSalvo.getEmail()
        );

        return ResponseEntity.status(201).body(response);
    }


}
