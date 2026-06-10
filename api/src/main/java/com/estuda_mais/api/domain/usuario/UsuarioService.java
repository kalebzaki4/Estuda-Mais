package com.estuda_mais.api.domain.usuario;

import com.estuda_mais.api.infra.exception.EmailJaCadastradoException;
import com.estuda_mais.api.infra.exception.UsuarioNaoEncontradoException;
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

    // ver todos os usuarios
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    // ver usuario por id
    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário com ID " + id + " não encontrado"));
    }

    // criar usuario
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

    // atualizar usuario
    @Transactional
    public Usuario update(Long id, UsuarioUpdateDTO updatedUsuario) {
        Usuario usuario = findById(id);
        usuario.setName(updatedUsuario.name());
        usuario.setEmail(updatedUsuario.email());
        usuario.setPassword(passwordEncoder.encode(updatedUsuario.password()));
        return usuarioRepository.save(usuario);
    }

    // deletar usuario
    @Transactional
    public void delete(Usuario usuario) {
        usuarioRepository.delete(usuario);
    }
}
