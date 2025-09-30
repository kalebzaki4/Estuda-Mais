// Caminho: com.backend.estudaMais.service.UserDetailsServiceImpl

package com.backend.estudaMais.service;

import com.backend.estudaMais.model.Usuario;
import com.backend.estudaMais.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService; // Interface-chave
import org.springframework.security.core.userdetails.UsernameNotFoundException; // Exceção-chave
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Usuario usuario = usuarioRepository.findByEmail(email);

        if (usuario == null) {
            throw new UsernameNotFoundException("Usuário não encontrado com o email: " + email);
        }

        return usuario;
    }
}