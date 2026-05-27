package com.estuda_mais.api.Controller;

import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(@PathVariable Long id, @RequestBody Usuario updatedUsuario) {
        try {
            Usuario existingUsuario = usuarioService.findById(id);
            if (existingUsuario == null) {
                return ResponseEntity.notFound().build();
            }
            updatedUsuario.setId(id);
            Usuario updated = usuarioService.update(updatedUsuario);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/id")
    public ResponseEntity<Usuario> delete(@RequestParam @PathVariable String id) {
        Long parsedId;
        try {
            parsedId = Long.valueOf(id);
        } catch (NumberFormatException e) {}
    }
}
