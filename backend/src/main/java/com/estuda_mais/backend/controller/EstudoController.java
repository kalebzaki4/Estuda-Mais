package com.estuda_mais.backend.controller;

import com.estuda_mais.backend.model.Estudo;
import com.estuda_mais.backend.service.EstudoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estudos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EstudoController {

    private final EstudoService estudoService;

    // 1. ADICIONAR ESTUDO (POST)
    @PostMapping
    public Estudo adicionarEstudo(@RequestBody Estudo estudo) {
        return estudoService.adicionarEstudo(estudo);
    }

    // 2. LISTAR ESTUDOS DE UM USUÁRIO (GET)
    @GetMapping("/usuario/{usuarioId}")
    public List<Estudo> listarEstudosDoUsuario(@PathVariable String usuarioId) {
        return estudoService.listarEstudosDoUsuario(usuarioId);
    }

    // 3. REMOVER ESTUDO (DELETE)
    @DeleteMapping("/{estudoId}") // <--- VARIÁVEL RENOMEADA
    public void removerEstudo(@PathVariable String estudoId) {
        estudoService.removerEstudo(estudoId);
    }

    // 4. ATUALIZAR ESTUDO/PROGRESSO (PUT)
    @PutMapping
    public Estudo atualizarEstudo(@RequestBody Estudo estudo) {
        return estudoService.atualizarEstudo(estudo);
    }
}