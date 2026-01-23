package com.example.backend.controller;

import com.example.backend.model.SessaoEstudo;
import com.example.backend.model.Usuario;
import com.example.backend.repository.SessaoEstudoRepository;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.service.EstatisticaService;
import com.example.backend.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private EstatisticaService estatisticaService;


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Usuario usuario) {
        var dadosToken = usuarioService.autenticar(usuario);

        if (dadosToken != null) {
            return ResponseEntity.ok(dadosToken);
        }

        return ResponseEntity.status(403).body("E-mail ou senha inválidos");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody @Valid Usuario usuario) {
        usuarioService.criarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso!");
    }

    @GetMapping("/{id}/estatisticas")
    public ResponseEntity<?> obterEstatisticas(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(estatisticaService.calcularResumoUsuario(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/ranking")
    public ResponseEntity<List<Usuario>> obterRanking() {
        return ResponseEntity.ok(usuarioService.getRanking());
    }
}