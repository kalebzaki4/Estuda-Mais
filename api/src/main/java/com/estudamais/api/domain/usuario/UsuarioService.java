package com.estudamais.api.domain.usuario;

import com.estudamais.api.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public void criarUsuario(UsuarioDTO dados) {
        if (usuarioRepository.findByEmail(dados.email()) != null) {
            throw new RuntimeException("Email já cadastrado");
        }

        Usuario usuario = new Usuario(dados);
        usuarioRepository.save(usuario);
    }

    @Transactional
    public void deletarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    @Transactional
    public void atualizarUsuario(Long id, UsuarioDTO dados) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(dados.nome());

        if (!dados.email().equals(usuario.getEmail())) {
            if (usuarioRepository.findByEmail(dados.email()) != null) {
                throw new RuntimeException("Email já cadastrado");
            }
            usuario.setEmail(dados.email());
        }

        if (dados.senha() != null && !dados.senha().isBlank()) {
            usuario.setSenha(dados.senha());
        }

        usuarioRepository.save(usuario);
    }

    public List<Usuario> listarUsuarios() {
        return (List<Usuario>) usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public Usuario buscarPorEmail(String email) {
        Usuario usuario = (Usuario) usuarioRepository.findByEmail(email);
        if (usuario == null) {
            throw new RuntimeException("Usuário não encontrado");
        }
        return usuario;
    }

    public boolean existsByEmail(String email) {
        return usuarioRepository.findByEmail(email) != null;
    }
}