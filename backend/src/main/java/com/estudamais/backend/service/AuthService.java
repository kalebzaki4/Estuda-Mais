package com.estudamais.backend.service;

import com.estudamais.backend.dto.AuthRequest;
import com.estudamais.backend.dto.AuthResponse;
import com.estudamais.backend.dto.RegisterRequest;
import com.estudamais.backend.model.Usuario;
import com.estudamais.backend.repository.UsuarioRepository;
import com.estudamais.backend.util.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Lógica de Registro de Novo Usuário.
     */
    public AuthResponse register(RegisterRequest request) {
        // 1. Verifica se o e-mail já está em uso
        if (usuarioRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado. Por favor, faça login.");
        }

        // 2. Cria o novo usuário com a senha criptografada
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(request.nome());
        novoUsuario.setEmail(request.email());
        novoUsuario.setSenha(passwordEncoder.encode(request.senha()));
        novoUsuario.setAtivo(true);
        novoUsuario.setPago(false);

        Usuario savedUser = usuarioRepository.save(novoUsuario);

        // 3. Gera e retorna o token de autenticação
        String token = jwtTokenService.generateToken(savedUser);
        return new AuthResponse(token);
    }

    /**
     * Lógica de Login de Usuário Existente.
     */
    public AuthResponse login(AuthRequest request) {
        // 1. Tenta autenticar o usuário usando o Spring Security
        // Isso lança uma exceção se a senha ou e-mail estiverem incorretos
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.senha())
        );

        // 2. Se autenticado com sucesso, gera o token
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtTokenService.generateToken((Usuario) userDetails);

        return new AuthResponse(token);
    }
}