package com.estudamais.backend.service;

import com.estudamais.backend.model.SessaoDeEstudo;
import com.estudamais.backend.repository.SessaoDeEstudoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessaoDeEstudoService {

    private final SessaoDeEstudoRepository sessaoDeEstudoRepository;

    public SessaoDeEstudoService(SessaoDeEstudoRepository sessaoDeEstudoRepository) {
        this.sessaoDeEstudoRepository = sessaoDeEstudoRepository;
    }

    public SessaoDeEstudo salvar(SessaoDeEstudo sessao) {
        return sessaoDeEstudoRepository.save(sessao);
    }

    public Optional<SessaoDeEstudo> buscarPorId(Long id) {
        return sessaoDeEstudoRepository.findById(id);
    }

    public List<SessaoDeEstudo> buscarTodasAsSessoes() {
        return sessaoDeEstudoRepository.findAll();
    }
}
