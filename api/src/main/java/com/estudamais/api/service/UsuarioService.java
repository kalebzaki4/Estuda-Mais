package com.estudamais.api.service;

import com.estudamais.api.dto.AutenticacaoDTO;
import com.estudamais.api.model.Usuario;
import com.estudamais.api.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public Usuario salvarUsuario(AutenticacaoDTO dto) {
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.email());
        novoUsuario.setEmail(dto.email());
        novoUsuario.setSenha(dto.senha());

        return usuarioRepository.save(novoUsuario);
    }
}
