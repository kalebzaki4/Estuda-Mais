package com.estuda_mais.api.service;

import com.estuda_mais.api.dto.RegisterRequestDTO;
import com.estuda_mais.api.dto.UsuarioUpdateDTO;
import com.estuda_mais.api.exception.EmailJaCadastradoException;
import com.estuda_mais.api.exception.UsuarioNaoEncontradoException;
import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário com ID " + id + " não encontrado"));
    }

    @Transactional
    public Usuario save(@Valid RegisterRequestDTO registerRequestDTO) {
        if (usuarioRepository.existsByEmail(registerRequestDTO.email())) {
            throw new EmailJaCadastradoException("Email " + registerRequestDTO.email() + " já está cadastrado");
        }

        Usuario usuario = new Usuario();

        usuario.setName(registerRequestDTO.name());
        usuario.setEmail(registerRequestDTO.email());

        usuario.setPassword(passwordEncoder.encode(registerRequestDTO.password()));

        return usuarioRepository.save(usuario);
    }

    @Transactional
    public Usuario update(Long id, UsuarioUpdateDTO updatedUsuario) {
        Usuario usuario = findById(id);
        usuario.setName(updatedUsuario.name());
        usuario.setEmail(updatedUsuario.email());
        usuario.setPassword(passwordEncoder.encode(updatedUsuario.password()));
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public void delete(Usuario usuario) {
        usuarioRepository.delete(usuario);
    }
}
