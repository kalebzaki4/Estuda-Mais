package com.example.backend.service;

import com.example.backend.model.Materia;
import com.example.backend.model.SessaoEstudo;
import com.example.backend.model.Usuario;
import com.example.backend.repository.MateriaRepository;
import com.example.backend.repository.SessaoEstudoRepository;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SessaoEstudoService {

    @Autowired
    private MateriaRepository materiaRepository;
    @Autowired
    private SessaoEstudoRepository sessaoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public SessaoEstudo prepararEstudo(String nomeMateria, Long usuarioId) {
        Materia materia = materiaRepository.findByNomeIgnoreCase(nomeMateria)
                .orElseGet(() -> {
                    Materia nova = new Materia();
                    nova.setNome(nomeMateria);
                    nova.setCor("#6366f1");
                    nova.setXpPorTopico(50);
                    return materiaRepository.save(nova);
                });
        return createNovaSessao(materia, usuarioId);
    }

    private SessaoEstudo createNovaSessao(Materia materia, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        SessaoEstudo sessao = new SessaoEstudo();
        sessao.setMateria(materia);
        sessao.setUsuario(usuario);
        sessao.setProgresso(0);

        return sessaoRepository.save(sessao);
    }

    public void finalizarTopico(Long sessaoId, String topicoNome) {
        SessaoEstudo sessao = sessaoRepository.findById(sessaoId).orElseThrow();
        sessao.getTopicosEstudados().add(topicoNome);

        int xpGanho = sessao.getMateria().getXpPorTopico() + 25;
        sessao.setXpGanhosTotal(sessao.getXpGanhosTotal() + xpGanho);

        Usuario usuario = sessao.getUsuario();
        usuario.setXp(usuario.getXp() + xpGanho);

        usuarioRepository.save(usuario);
        sessaoRepository.save(sessao);
    }

    public SessaoEstudo iniciarSessaoComDetalhes(Long sessaoId, Integer duracao, List<String> topicos) {
        SessaoEstudo sessao = sessaoRepository.findById(sessaoId)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada"));

        sessao.setDuracaoPlanejada(duracao);
        sessao.setTopicosEstudados(topicos);
        sessao.setDataInicio(LocalDateTime.now());

        return sessaoRepository.save(sessao);
    }

    public SessaoEstudo finalizarSessao(Long sessaoId, Integer minutosReais) {
        SessaoEstudo sessao = sessaoRepository.findById(sessaoId)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada"));

        sessao.setConcluida(true);
        sessao.setDuracaoRealizada(minutosReais);

        Usuario usuario = sessao.getUsuario();
        int bonusConclusao = 100;
        usuario.setXp(usuario.getXp() + bonusConclusao);
        sessao.setXpGanhosTotal(sessao.getXpGanhosTotal() + bonusConclusao);

        usuarioRepository.save(usuario);
        return sessaoRepository.save(sessao);
    }
}