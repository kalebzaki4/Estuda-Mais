package com.estudamais.api.domain.usuario;

import com.estudamais.api.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public void criarUsuario(UsuarioDTO dados) {
        if (usuarioRepository.findByEmail(dados.email()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        Usuario usuario = new Usuario(dados);
        usuario.setSenha(passwordEncoder.encode(dados.senha()));

        usuarioRepository.save(usuario);
    }

    @Transactional
    public void atualizarUsuario(Long id, UsuarioDTO dados) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(dados.nome());

        if (!dados.email().equals(usuario.getEmail())) {
            if (usuarioRepository.findByEmail(dados.email()).isPresent()) {
                throw new RuntimeException("Email já cadastrado");
            }
            usuario.setEmail(dados.email());
        }

        if (dados.senha() != null && !dados.senha().isBlank()) {
            usuario.setSenha(passwordEncoder.encode(dados.senha()));
        }

        usuarioRepository.save(usuario);
    }

    @Transactional
    public void deletarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    public List<Usuario> listarUsuarios() {
        List<Usuario> usuarios = new ArrayList<>();
        usuarioRepository.findAll().forEach(usuarios::add);
        return usuarios;
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public boolean existsByEmail(String email) {
        return usuarioRepository.findByEmail(email).isPresent();
    }
}