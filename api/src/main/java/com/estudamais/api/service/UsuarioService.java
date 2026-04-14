package com.estudamais.api.service;

import com.estudamais.api.dto.AutenticacaoDTO;
import com.estudamais.api.dto.UsuarioAtualizacaoDTO;
import com.estudamais.api.infra.config.exception.ResourceNotFoundException;
import com.estudamais.api.model.Usuario;
import com.estudamais.api.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Usuario salvarUsuario(Usuario usuario) {
        String senha = usuario.getSenha();
        String senhaCrpitografada = passwordEncoder.encode(senha);
        usuario.setSenha(senhaCrpitografada);
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById((id)).orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
    }

    @Transactional
    public Usuario deleteUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById((id)).orElseThrow(() -> new ResourceNotFoundException("Ops! Não encontramos o usuário com o ID: " + id));

        usuarioRepository.delete(usuario);
        return usuario;
    }

    @Transactional
    public Usuario updateUsuario(Long id, @Valid UsuarioAtualizacaoDTO dadosUsuario) {
        Usuario usuario = usuarioRepository.findById((id)).orElseThrow(() -> new ResourceNotFoundException("Ops! Não encontramos o usuário"));
        usuario.setNome(dadosUsuario.nome());
        usuario.setEmail(dadosUsuario.email());
        usuario.setSenha(dadosUsuario.senha());
        usuarioRepository.save(usuario);
        return usuario;
    }
}
