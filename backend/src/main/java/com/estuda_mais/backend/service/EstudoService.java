package com.estuda_mais.backend.service;

import com.estuda_mais.backend.model.Estudo; // Usa o novo nome do Model
import com.estuda_mais.backend.repository.EstudoRepository; // Usa o novo nome do Repository
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EstudoService {

    private final EstudoRepository estudoRepository;

    // 1. ADICIONAR ESTUDO
    public Estudo adicionarEstudo(Estudo estudo) { // <--- RENOMEADO
        return estudoRepository.save(estudo);
    }

    // 2. REMOVER ESTUDO
    public void removerEstudo(String estudoId) { // <--- RENOMEADO
        estudoRepository.deleteById(estudoId);
    }

    // 3. LISTAR ESTUDOS DE UM USUÁRIO ESPECÍFICO
    public List<Estudo> listarEstudosDoUsuario(String usuarioId) { // <--- RENOMEADO
        return estudoRepository.findByUsuarioId(usuarioId);
    }

    // 4. OBTER DETALHES DO ESTUDO
    public Estudo obterDetalhesDoEstudo(String estudoId) { // <--- RENOMEADO
        Optional<Estudo> estudo = estudoRepository.findById(estudoId);
        return estudo.orElse(null);
    }

    // 5. ATUALIZAR ESTUDO (Usado para atualizar o Progresso)
    public Estudo atualizarEstudo(Estudo estudo) {
        return estudoRepository.save(estudo);
    }
}