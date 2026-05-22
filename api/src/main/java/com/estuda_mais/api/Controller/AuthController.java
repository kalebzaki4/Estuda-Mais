package com.estuda_mais.api.Controller;

import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(name = "/auth")
public class AuthController {
    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // criar usuario
    @PostMapping
    public ResponseEntity<Usuario> autenticar(@RequestBody Usuario usuario) {
        Usuario usuarioAutenticado = usuarioService.autenticar(usuario.getEmail(), usuario.getPassword());
        if (usuarioAutenticado != null) {
            return ResponseEntity.ok(usuarioAutenticado);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    // fazer login
    @PostMapping
    public ResponseEntity<Usuario> login(@RequestBody Usuario usuario) {
        Usuario usuarioAutenticado = usuarioService.autenticar(usuario.getEmail(), usuario.getPassword());
        if (usuarioAutenticado != null) {
            return ResponseEntity.ok(usuarioAutenticado);
        } else {
            return ResponseEntity.status(401).build();
        }
    }
}
