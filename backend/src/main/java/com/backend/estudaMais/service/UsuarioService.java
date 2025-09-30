package com.backend.estudaMais.service;

import com.backend.estudaMais.model.Usuario;
import com.backend.estudaMais.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Salvar ou atualizar um usuário.
    public Usuario save(Usuario usuario) {
        // Obtém a senha em texto simples
        String senhaTexto = usuario.getSenha();

        // Criptografa a senha usando o BCryptPasswordEncoder
        String senhaHasheada = passwordEncoder.encode(senhaTexto);

        // Define a senha hasheada de volta no objeto antes de salvar
        usuario.setSenha(senhaHasheada);

        // Salva o usuário com a senha criptografada no banco
        return usuarioRepository.save(usuario);
    }

    // Buscar todos os usuários.
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    // Buscar um usuário por ID.
    public Optional<Usuario > findById(Long id) {
        return usuarioRepository.findById(id);
    }

    // Deletar um usuário por ID.
    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);
    }};
