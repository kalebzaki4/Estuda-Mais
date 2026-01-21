package com.example.backend.service;

import com.example.backend.model.Usuario;
import com.example.backend.model.dto.DadosTokenDTO;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    // criar usuario
    public void criarUsuario(Usuario usuario) {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email ja cadastrado");
        }

        // Forma elegante e padrão do Spring para encriptar
        String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCriptografada);

        usuarioRepository.save(usuario);
    }

    // buscar usuario por email
    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElse(null); // Retornar null é mais seguro para o fluxo do Controller que fizemos
    }

    // validar credenciais
    public boolean validarCredenciais(String email, String senha) {
        Usuario usuario = buscarPorEmail(email);
        if (usuario == null) return false;

        return passwordEncoder.matches(senha, usuario.getSenha());
    }

    // atualizar usuario
    public void atualizarUsuario(Usuario usuario) {
        Usuario usuarioExistente = buscarPorEmail(usuario.getEmail());
        if (usuarioExistente != null) {
            usuarioExistente.setNome(usuario.getNome());
            usuarioRepository.save(usuarioExistente);
        }
    }

    // deletar usuario
    public void deletarUsuario(String email) {
        Usuario usuarioExistente = buscarPorEmail(email);
        if (usuarioExistente != null) {
            usuarioRepository.delete(usuarioExistente);
        }
    }

    // Autenticação via token JWT
    public DadosTokenDTO autenticar(Usuario dadosLogin) {
        return usuarioRepository.findByEmail(dadosLogin.getEmail())
                .filter(user -> passwordEncoder.matches(dadosLogin.getSenha(), user.getSenha()))
                .map(user -> new DadosTokenDTO(tokenService.gerarToken(user)))
                .orElse(null);
    }
}