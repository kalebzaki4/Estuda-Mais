package com.estudamais.api.controller;

import com.estudamais.api.dto.AutenticacaoDTO;
import com.estudamais.api.model.Usuario;
import com.estudamais.api.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // ver todos os usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> findAll() {
        List<Usuario> usuarios = usuarioService.findAll();
        return ResponseEntity.ok(usuarios);
    }

    // ver usuario expecifico
    @GetMapping("/{id}")
    public ResponseEntity findById(@PathVariable Long id) {
        Usuario usuario = usuarioService.findById(id);
        return ResponseEntity.ok(usuario);
    }

    // criar usuario
    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody @Valid AutenticacaoDTO dadosUsuario, UriComponentsBuilder uriBuilder) {
        Usuario usuarioSalvo = usuarioService.salvarUsuario(dadosUsuario);
        var uri = uriBuilder.path("/usuarios/{id}").buildAndExpand(usuarioSalvo.getId()).toUri();
        return ResponseEntity.created(uri).body(usuarioSalvo);
    }

    // deletar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }


    // atualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id, @RequestBody @Valid AutenticacaoDTO dadosUsuario) {
        Usuario usuarioAtualizado = usuarioService.updateUsuario(id, dadosUsuario);
        return ResponseEntity.ok(usuarioAtualizado);
    }
}
