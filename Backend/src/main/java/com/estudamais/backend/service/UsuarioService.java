package com.estudamais.backend.service;

import com.estudamais.backend.model.Usuario;
import com.estudamais.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario cadastrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Optional<Usuario> realizarLogin(String email, String senha) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);

        if (usuarioOptional.isPresent() && usuarioOptional.get().getSenha().equals(senha)) {
            return usuarioOptional;
        }

        return Optional.empty();
    }

    public List<Usuario> buscarTodosUsuarios() {
        return List.of();
    }
}