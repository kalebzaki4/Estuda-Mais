package com.backend.estudaMais.service;

import com.backend.estudaMais.model.Usuario;
import com.backend.estudaMais.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    // Buscar usuário por ID
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    // Salvar ou atualizar usuário
    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Deletar usuário por ID
    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);
    }

    // Buscar usuário por email
    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
}