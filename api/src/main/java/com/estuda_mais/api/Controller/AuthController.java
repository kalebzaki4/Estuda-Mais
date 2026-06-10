package com.estuda_mais.api.controller;

import com.estuda_mais.api.domain.usuario.LoginRequestDTO;
import com.estuda_mais.api.domain.usuario.RegisterRequestDTO;
import com.estuda_mais.api.domain.usuario.UsuarioResponseDTO;
import com.estuda_mais.api.domain.usuario.Usuario;
import com.estuda_mais.api.infra.security.TokenService;
import com.estuda_mais.api.domain.usuario.UsuarioService;
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
