package com.backend.estudaMais.controller;

import com.backend.estudaMais.model.Usuario;
import com.backend.estudaMais.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> todosOsUsuarios() {
        return usuarioService.findAll();
    }

    @PostMapping
    public void novoUsuario( @RequestBody Usuario usuario) {
        usuarioService.save(usuario);
    }

    @GetMapping("/{id}")
    public Optional<Usuario> buscarUsuarioPorId(@PathVariable Long id) {
        return usuarioService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Long id) {
        usuarioService.deleteById(id);
    }

    @PutMapping ("/{id}")
    public Usuario atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioService.save(usuario);
    }

}
