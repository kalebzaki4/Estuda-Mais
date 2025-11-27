package com.estuda_mais.backend.service;

import com.estuda_mais.backend.model.Usuario;
import com.estuda_mais.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    // criar conta
    public Usuario criarConta(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // buscar por email
    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    // buscar por id
    public Usuario buscarPorId(String id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    // atualizar usuario
    public Usuario atualizarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // deletar usuario
    public void deletarUsuario(String id) {
        usuarioRepository.deleteById(id);
    }

    // listar todos os usuarios
    public java.util.List<Usuario> listarTodosUsuarios() {
        return usuarioRepository.findAll();
    }

    // contar usuarios
    public long contarUsuarios() {
        return usuarioRepository.count();
    }

    // verificar se email existe
    public boolean emailExiste(String email) {
        return usuarioRepository.findByEmail(email) != null;
    }

}
