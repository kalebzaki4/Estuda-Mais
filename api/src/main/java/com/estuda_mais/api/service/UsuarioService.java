package com.estuda_mais.api.service;

import com.estuda_mais.api.dto.RegisterRequestDTO;
import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    @Transactional
    public Usuario save(@Valid RegisterRequestDTO registerRequestDTO) {

        if (usuarioRepository.existsByEmail(registerRequestDTO.email())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        Usuario usuario = new Usuario();

        usuario.setName(registerRequestDTO.name());
        usuario.setEmail(registerRequestDTO.email());

        usuario.setPassword(passwordEncoder.encode(registerRequestDTO.password()));

        return usuarioRepository.save(usuario);
    }

    public Usuario findById(Long id) {
        Usuario usuarioEncontrado = usuarioRepository.findById(id).orElse(null);
        if (usuarioEncontrado == null) {
            throw new IllegalArgumentException("Usuário não encontrado");
        }
        return usuarioEncontrado;
    }

    public Usuario update(Usuario updatedUsuario) {
        Usuario existingUsuario = usuarioRepository.findById(updatedUsuario.getId()).orElse(null);
        if (existingUsuario == null) {
            throw new IllegalArgumentException("Usuário não encontrado");
        }

        existingUsuario.setName(updatedUsuario.getName());
        existingUsuario.setEmail(updatedUsuario.getEmail());

        if (updatedUsuario.getPassword() != null && !updatedUsuario.getPassword().isEmpty()) {
            existingUsuario.setPassword(passwordEncoder.encode(updatedUsuario.getPassword()));
        }

        return usuarioRepository.save(existingUsuario);
    }

    public void delete(Usuario usuario) {
        usuarioRepository.delete(usuario);
    }
}
