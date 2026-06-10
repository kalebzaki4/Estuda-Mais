package com.estuda_mais.api.infra.security;

import com.estuda_mais.api.infra.exception.UsuarioNaoEncontradoException;
import com.estuda_mais.api.domain.usuario.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticationService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public AutenticationService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // verificação de autenticação do usuário pelo email
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário não encontrado com email: " + username));
    }
}
