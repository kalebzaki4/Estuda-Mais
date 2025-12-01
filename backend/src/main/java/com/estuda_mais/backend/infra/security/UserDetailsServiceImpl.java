package com.estuda_mais.backend.infra.security;

import com.estuda_mais.backend.repository.UsuarioRepository;
import com.estuda_mais.backend.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Usuario user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("Usuário não encontrado!");
        }

        return user; // UserModel deve implementar UserDetails
    }
}
