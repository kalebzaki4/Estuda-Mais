package com.estuda_mais.api.Service;

import com.estuda_mais.api.Repository.UsuarioRepository;
import com.estuda_mais.api.model.Usuario;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final PasswordEncoder encoder;

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(PasswordEncoder encoder, UsuarioRepository usuarioRepository) {
        this.encoder = encoder;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> buscarPorNome(String username) {
        return usuarioRepository.findByUsernameContainingIgnoreCase(username);

    }

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Transactional
    public Usuario addUsuario(Usuario usuario) {
        Optional<Usuario> usuarioSalvo = usuarioRepository.findByEmail(usuario.getEmail());
        if (usuarioSalvo.isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }
        usuario.setPassword(encoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public Usuario updateUsuario(Usuario usuario) {
        Usuario usuarioAtualizado = usuarioRepository.findById(usuario.getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuarioAtualizado.setUsername(usuario.getUsername());
        usuarioAtualizado.setEmail(usuario.getEmail());
        usuarioAtualizado.setPassword(usuario.getPassword());
        return usuarioRepository.save(usuarioAtualizado);
    }

    @Transactional
    public void deleteUsuario(Long usuario) {
        Usuario usuarioDeletado = usuarioRepository.findById(usuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuarioRepository.delete(usuarioDeletado);
    }
}
