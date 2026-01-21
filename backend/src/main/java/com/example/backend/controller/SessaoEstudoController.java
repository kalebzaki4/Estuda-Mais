package com.example.backend.controller;

import com.example.backend.model.SessaoEstudo;
import com.example.backend.model.dto.SessaoIniciadaDTO;
import com.example.backend.repository.SessaoEstudoRepository;
import com.example.backend.service.SessaoEstudoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sessoes")
@CrossOrigin (origins = "*")
public class SessaoEstudoController {

    @Autowired
    private SessaoEstudoService service;

    @Autowired
    private SessaoEstudoRepository repository;

    @PostMapping("/preparar")
    public ResponseEntity<SessaoEstudo> preparar(@RequestParam String nomeMateria, @RequestParam Long usuarioId) {
        return ResponseEntity.ok(service.prepararEstudo(nomeMateria, usuarioId));
    }

    @PutMapping("/{id}/iniciar")
    public ResponseEntity<SessaoEstudo> iniciar(@PathVariable Long id, @RequestBody SessaoIniciadaDTO dados) {
        return ResponseEntity.ok(service.iniciarSessaoComDetalhes(id, dados.tempo(), dados.topicos()));
    }

    @GetMapping("/recentes/{usuarioId}")
    public List<SessaoEstudo> listarRecentes(@PathVariable Long usuarioId) {
        return repository.findTop5ByUsuarioIdOrderByDataInicioDesc(usuarioId);
    }

    @PutMapping("/{id}/finalizar")
    public ResponseEntity<SessaoEstudo> finalizar(@PathVariable Long id, @RequestParam Integer minutos) {
        return ResponseEntity.ok(service.finalizarSessao(id, minutos));
    }
}