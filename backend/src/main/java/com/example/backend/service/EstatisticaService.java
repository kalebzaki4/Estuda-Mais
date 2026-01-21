package com.example.backend.service;

import com.example.backend.model.SessaoEstudo;
import com.example.backend.model.Usuario;
import com.example.backend.repository.SessaoEstudoRepository;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EstatisticaService {

    @Autowired
    private SessaoEstudoRepository sessaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Map<String, Object> calcularResumoUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<SessaoEstudo> sessoes = sessaoRepository.findByUsuarioId(usuarioId);

        int totalMinutos = sessoes.stream()
                .mapToInt(s -> s.getDuracaoRealizada() != null ? s.getDuracaoRealizada() : 0)
                .sum();

        long sessoesConcluidas = sessoes.stream()
                .filter(SessaoEstudo::isConcluida)
                .count();

        return Map.of(
                "totalMinutos", totalMinutos,
                "sessoesConcluidas", sessoesConcluidas,
                "xpTotal", usuario.getXp(),
                "nivel", calcularNivel(usuario.getXp())
        );
    }

    private int calcularNivel(int xp) {
        return (xp / 1000) + 1;
    }
}