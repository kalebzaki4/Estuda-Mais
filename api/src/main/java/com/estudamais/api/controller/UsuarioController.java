package com.estudamais.api.controller;

import com.estudamais.api.domain.usuario.Usuario;
import com.estudamais.api.domain.usuario.UsuarioService;
import com.estudamais.api.dto.TokenDTO;
import com.estudamais.api.dto.UsuarioDTO;
import com.estudamais.api.infra.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity<TokenDTO> criarUsuario(
            @RequestBody UsuarioDTO dados,
            UriComponentsBuilder uriBuilder) {

        usuarioService.criarUsuario(dados);

        Usuario usuario = usuarioService.buscarPorEmail(dados.email());

        String token = tokenService.gerarToken(usuario);

        URI uri = uriBuilder.path("/usuarios/{id}").buildAndExpand(usuario.getId()).toUri();

        return ResponseEntity.created(uri).body(new TokenDTO(token));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
        usuarioService.deletarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarUsuario(
            @PathVariable Long id,
            @RequestBody UsuarioDTO dados) {
        usuarioService.atualizarUsuario(id, dados);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> detalhar(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        return ResponseEntity.ok(new UsuarioDTO(usuario));
    }
}