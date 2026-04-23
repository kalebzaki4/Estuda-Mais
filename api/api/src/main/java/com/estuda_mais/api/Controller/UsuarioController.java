package com.estuda_mais.api.Controller;

import com.estuda_mais.api.Service.UsuarioService;
import com.estuda_mais.api.dto.AtualizarUsuarioDTO;
import com.estuda_mais.api.model.Usuario;
import jakarta.validation.Valid;
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

    // localizar todos usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.getAllUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    // localizar usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUserById(@PathVariable Long id) {
        Usuario user = UsuarioService.buscarPorNome(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    // criar usuario
    @PostMapping
    public ResponseEntity<Usuario> addUsuario(@RequestBody Usuario dadosUsuario) {
        Usuario usuarioCriado = usuarioService.addUsuario(dadosUsuario);
        return ResponseEntity.status(201).body(usuarioCriado);
    }

    // atualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id, @RequestBody @Valid Usuario dadosUsuario) {
        dadosUsuario.setId(id);
        Usuario usuarioAtualizado = usuarioService.updateUsuario(dadosUsuario);
        return usuarioAtualizado != null ? ResponseEntity.ok(usuarioAtualizado) : ResponseEntity.notFound().build();

    }

    // deletar Usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Usuario> deleteUsuario(@PathVariable Long id) {
        this.usuarioService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }

}
