package com.estudamais.api.controller;

import com.estudamais.api.dto.LoginDTO;
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
@RequestMapping("/login")
public class AutenticacaoController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping
    public ResponseEntity<?> autenticarUsuario(@RequestBody @Valid LoginDTO loginDTO) {
        var Token = new UsernamePasswordAuthenticationToken(loginDTO.email(), loginDTO.senha());
        var authentication = authenticationManager.authenticate(Token);

        return ResponseEntity.ok().build();
    }
}
