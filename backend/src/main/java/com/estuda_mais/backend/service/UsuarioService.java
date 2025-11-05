package com.estuda_mais.backend.service;

import com.estuda_mais.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements UserDetailsService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    // Implementação do método loadUserByUsername para carregar o usuário pelo email
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o email: " + username));
    }

    // metodo para cadastrar usuario
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void cadastrarUsuario(com.estuda_mais.backend.model.Usuario usuario) {
        // Criptografa a senha antes de salvar
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuarioRepository.save(usuario);
    }

    // metodo para buscar usuario por email
    public com.estuda_mais.backend.model.Usuario buscarPorEmail(String email) {
        // Retorna o usuário ou null se não encontrado
        return usuarioRepository.findByEmail(email).orElse(null);
    }

    // metodo para buscar usuario por id
    public com.estuda_mais.backend.model.Usuario buscarPorId(Long id) {
        // Retorna o usuário ou null se não encontrado
        return usuarioRepository.findById(id).orElse(null);
    }

    // metodo para atualizar usuario
    public void atualizarUsuario(com.estuda_mais.backend.model.Usuario usuario) {
        // Verifica se a senha foi alterada
        com.estuda_mais.backend.model.Usuario usuarioExistente = buscarPorId(usuario.getId());
        if (usuarioExistente != null && !usuarioExistente.getSenha().equals(usuario.getSenha())) {
            // Criptografa a nova senha antes de salvar
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
            usuarioRepository.save(usuario);
        }
    }

    // metodo para deletar usuario
    public void deletarUsuario(Long id) {
        // Deleta o usuário pelo id
        usuarioRepository.deleteById(id);
    }

    // metodo para verificar se email ja existe
    public boolean emailExiste(String email) {
        // Retorna true se o email já estiver cadastrado
        return usuarioRepository.existsByEmail(email);
    }

    // metodo para verificar se nome de usuario ja existe
    public boolean nomeUsuarioExiste(String nomeUsuario) {
        // Retorna true se o nome de usuário já estiver cadastrado
        return usuarioRepository.existsByNomeUsuario(nomeUsuario);
    }
}
