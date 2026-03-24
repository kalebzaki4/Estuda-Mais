package com.estudamais.api.service;

import com.estudamais.api.dto.AutenticacaoDTO;
import com.estudamais.api.exception.ResourceNotFoundException;
import com.estudamais.api.model.Usuario;
import com.estudamais.api.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(Math.toIntExact(id)).orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
    }

    @Transactional
    public Usuario deleteUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(Math.toIntExact(id)).orElseThrow(() -> new ResourceNotFoundException("Ops! Não encontramos o usuário com o ID: " + id));

        usuarioRepository.delete(usuario);
        return usuario;
    }

    @Transactional
    public Usuario updateUsuario(Long id, @Valid AutenticacaoDTO dadosUsuario) {
        Usuario usuario = usuarioRepository.findById(Math.toIntExact(id)).orElseThrow(() -> new ResourceNotFoundException("Ops! Não encontramos o usuário"));
        usuario.setNome(dadosUsuario.nome());
        usuario.setEmail(dadosUsuario.email());
        usuario.setSenha(dadosUsuario.senha());
        usuarioRepository.save(usuario);
        return usuario;
    }
}
