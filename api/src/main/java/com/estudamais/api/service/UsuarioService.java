package com.estudamais.api.service;

import com.estudamais.api.dto.UsuarioDTO;
import com.estudamais.api.model.Usuario;
import com.estudamais.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void criarUsuario(UsuarioDTO dados) {
        Usuario usuario = new Usuario(dados);
        usuario.setNome(dados.nome());
        usuario.setEmail(dados.email());
        usuario.setSenha(dados.senha());

        usuarioRepository.save(usuario);
    }

    public void deletarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    public void atualizarUsuario(Long id, UsuarioDTO dados) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(dados.nome());
        usuario.setEmail(dados.email());
        usuario.setSenha(dados.senha());
        usuarioRepository.save(usuario);
    }

    public Object listarUsuarios() {
        return usuarioRepository.findAll();
    }
}
