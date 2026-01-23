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
    @Autowired
    private PostService postService;

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

    public SessaoEstudo finalizarSessao(Long sessaoId, Integer minutosReais, String resumo, List<String> topicos) {
        SessaoEstudo sessao = sessaoRepository.findById(sessaoId)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada"));

        if (resumo == null || resumo.length() < 100) {
            throw new RuntimeException("Resumo deve ter pelo menos 100 caracteres para ganhar XP.");
        }

        sessao.setConcluida(true);
        sessao.setDuracaoRealizada(minutosReais);
        sessao.setResumo(resumo);
        if (topicos != null) {
            sessao.setTopicosEstudados(topicos);
        }

        // Cálculo de XP: (Quantidade_Pomodoros * 50) + (Quantidade_Topicos * 10)
        int pomodoros = minutosReais / 25;
        int qtdTopicos = sessao.getTopicosEstudados().size();
        int xpGanho = (pomodoros * 50) + (qtdTopicos * 10);

        Usuario usuario = sessao.getUsuario();
        usuario.setXp(usuario.getXp() + xpGanho);
        sessao.setXpGanhosTotal(xpGanho);

        usuarioRepository.save(usuario);
        SessaoEstudo sessaoSalva = sessaoRepository.save(sessao);
        
        // Criar post no feed social
        postService.criarPostDeSessao(sessaoSalva);
        
        return sessaoSalva;
    }

    public List<SessaoEstudo> getSocialFeed() {
        return sessaoRepository.findByConcluidaTrueAndResumoIsNotNullOrderByDataInicioDesc();
    }
}