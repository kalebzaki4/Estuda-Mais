package com.estuda_mais.api.Controller;

import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> findAll() {
        List<Usuario> usuarios = usuarioService.findAll();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/id")
    public ResponseEntity<Usuario> findById(@RequestParam String id) {
        Long parsedId;
        try {
            parsedId = Long.valueOf(id);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }

        Usuario usuario = usuarioService.findById(parsedId);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuario);
    }
}
