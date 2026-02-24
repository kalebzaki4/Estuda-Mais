package com.estudamais.api.controller;

import com.estudamais.api.dto.DadosTokenDTO;
import com.estudamais.api.dto.UsuarioDTO;
import com.estudamais.api.infra.security.TokenService;
import com.estudamais.api.model.Usuario;
import com.estudamais.api.repository.UsuarioRepository;
import com.estudamais.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public ResponseEntity<Object> criarUsuario(@RequestBody UsuarioDTO dados) {
        this.usuarioService.criarUsuario(dados);
        return ResponseEntity.ok().build();
    }

    // Endpoint para fazer login
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UsuarioDTO dados) {
        Usuario usuario = this.usuarioRepository.findByEmail(dados.email());

        if (usuario != null && usuario.getSenha().equals(dados.senha())) {
            String token = tokenService.gerarToken(usuario);
            return ResponseEntity.ok(new DadosTokenDTO(token));
        }

        return ResponseEntity.status(401).body("Credenciais inválidas");
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
