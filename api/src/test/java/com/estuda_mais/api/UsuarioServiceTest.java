package com.estuda_mais.api;

import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.repository.UsuarioRepository;
import com.estuda_mais.api.service.UsuarioService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    public void deveBuscarTodosOsUsuarios() {
        // Arrange
        Usuario usuario1 = new Usuario();
        Usuario usuario2 = new Usuario();
        when(usuarioRepository.findAll()).thenReturn(Arrays.asList(usuario1, usuario2));

        // Act
        List<Usuario> usuarios = usuarioService.findAll();

        // Assert
        assertEquals(2, usuarios.size());

    }

    @Test
    public void deveBuscarPorIdUsuario() {
        // Arrange
        Usuario usuario1 = new Usuario();
        usuario1.setId(1L);
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario1));

        // Act
        Optional<Usuario> usuario = Optional.ofNullable(usuarioService.findById(1L));

        // Assert
        assertEquals(usuario1, usuario.orElse(null));
    }
}
