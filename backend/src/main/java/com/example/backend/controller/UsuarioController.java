package com.example.backend.controller;

import com.example.backend.model.Usuario;
import com.example.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Usuario usuario) {
        var dadosToken = usuarioService.autenticar(usuario);

        if (dadosToken != null) {
            return ResponseEntity.ok(dadosToken);
        }

        return ResponseEntity.status(403).body("E-mail ou senha inválidos");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody Usuario usuario) {
        usuarioService.criarUsuario(usuario);
        return ResponseEntity.ok("Usuário cadastrado com sucesso!");
    }
}