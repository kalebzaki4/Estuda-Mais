package com.estudamais.api.controller;

import com.estudamais.api.dto.AutenticacaoDTO;
import com.estudamais.api.model.Usuario;
import com.estudamais.api.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // criar usuario
    @GetMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody @Valid AutenticacaoDTO dadosUsuario, UriComponentsBuilder uriBuilder) {
        Usuario usuarioSalvo = usuarioService.salvarUsuario(dadosUsuario);
        var uri = uriBuilder.path("/usuarios/{id}").buildAndExpand(usuarioSalvo.getId()).toUri();
        return ResponseEntity.created(uri).body(usuarioSalvo);
    }

}
