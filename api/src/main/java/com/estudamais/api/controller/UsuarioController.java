package com.estudamais.api.controller;

import com.estudamais.api.dto.UsuarioDTO;
import com.estudamais.api.model.Usuario;
import com.estudamais.api.repository.UsuarioRepository;
import com.estudamais.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Endpoint para criar um novo usuário
    @PostMapping
    public ResponseEntity<Object> criarUsuario(@RequestBody UsuarioDTO dados, UriComponentsBuilder uriBuilder) {
        var usuario = new Usuario(dados);
        usuarioRepository.save(usuario);

        var uri = uriBuilder.path("/usuarios/{id}").buildAndExpand(usuario.getId()).toUri();

        return ResponseEntity.created(uri).body(usuario);
    }

    // Endpoint para deletar um usuário
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarUsuario(@PathVariable Long id) { // Mudamos de UsuarioDTO para Long
        this.usuarioService.deletarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint para atualizar um usuário
    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO dados) {
        // Geralmente no PUT enviamos o ID pela URL e os novos dados pelo Body
        this.usuarioService.atualizarUsuario(id, dados);
        return ResponseEntity.ok().build();
    }

    // Endpoint para listar todos os usuários
    @GetMapping
    public ResponseEntity<Object> listarUsuarios() {
        return ResponseEntity.ok(this.usuarioService.listarUsuarios());
    }
}
