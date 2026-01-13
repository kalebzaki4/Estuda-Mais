package com.example.backend.service;

import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // criar usuario
    public void criarUsuario(Usuario usuario) {

        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email ja cadastrado");
        }
        String senhaCriptografada = org.springframework.security.crypto.bcrypt.BCrypt
                .hashpw(usuario.getSenha(), org.springframework.security.crypto.bcrypt.BCrypt.gensalt());
        usuario.setSenha(senhaCriptografada);

        usuarioRepository.save(usuario);

    }

    // buscar usuario por email
    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));
    }

    // validar credenciais
    public boolean validarCredenciais(String email, String senha) {
        Usuario usuario = buscarPorEmail(email);
        boolean senhaValida = org.springframework.security.crypto.bcrypt.BCrypt
                .checkpw(senha, usuario.getSenha());

        if (!senhaValida) {
            throw new IllegalArgumentException("Senha invalida");
        }
        return true;
    }

    // atualizar usuario
    public void atualizarUsuario(Usuario usuario) {
        Usuario usuarioExistente = buscarPorEmail(usuario.getEmail());
        usuarioExistente.setNome(usuario.getNome());
        usuarioRepository.save(usuarioExistente);
    }

    // deletar usuario
    public void deletarUsuario(String email) {
        Usuario usuarioExistente = buscarPorEmail(email);
        usuarioRepository.delete(usuarioExistente);
    }
}


