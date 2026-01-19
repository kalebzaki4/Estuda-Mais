package com.example.backend.controller;

import com.example.backend.model.Usuario;
import com.example.backend.model.dto.DadosTokenDTO;
import com.example.backend.service.UsuarioService;
import com.example.backend.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Usuario usuario) {
        var usuarioAutenticado = usuarioService.buscarPorEmail(usuario.getEmail());

        if (usuarioAutenticado != null &&
                passwordEncoder.matches(usuario.getSenha(), usuarioAutenticado.getSenha())) {

            var tokenJWT = tokenService.gerarToken(usuarioAutenticado);
            return ResponseEntity.ok(new DadosTokenDTO(tokenJWT));
        }

        return ResponseEntity.status(403).body("E-mail ou senha inválidos");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody Usuario usuario) {
        usuarioService.criarUsuario(usuario);
        return ResponseEntity.ok("Usuário cadastrado com sucesso!");
    }
}