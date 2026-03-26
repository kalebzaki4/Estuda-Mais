package com.estudamais.api.controller;

import com.estudamais.api.dto.AutenticacaoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/login")
public class AutenticationController {

    private final AuthenticationManager authenticationManager;

    @Autowired
    public AutenticationController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping
    public ResponseEntity<?> autenticar(@RequestBody AutenticacaoDTO dados) {
        var token = new UsernamePasswordAuthenticationToken(dados.nome(), dados.senha());
        authenticationManager.authenticate(token);

        return ResponseEntity.ok().build();
    }
}
