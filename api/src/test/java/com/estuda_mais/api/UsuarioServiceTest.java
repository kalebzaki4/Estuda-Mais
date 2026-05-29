package com.estuda_mais.api;

import com.estuda_mais.api.dto.RegisterRequestDTO;
import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.repository.UsuarioRepository;
import com.estuda_mais.api.service.UsuarioService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    @DisplayName("Deve buscar todos os usuários")
    void deveBuscarTodosOsUsuarios() {
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
    @DisplayName("Deve buscar usuário por ID")
    void deveBuscarUsuarioPorId() {
        // Arrange
        Usuario usuario1 = new Usuario();
        usuario1.setId(1L);
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario1));

        // Act
        Usuario usuario = usuarioService.findById(1L);

        // Assert
        assertEquals(usuario1, usuario);
    }

    @Test
    @DisplayName("Deve lançar exceção quando usuário não existir")
    void deveLancarExcecaoQuandoUsuarioNaoExistir() {
        // Arrange
        Usuario usuario1 = new Usuario();
        usuario1.setId(1L);
        when(usuarioRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            usuarioService.findById(1L);
        });

        // Assert
        assertEquals("Usuário não encontrado", exception.getMessage());
    }

    @Test
    @DisplayName("Deve criar um novo usuário")
    void deveCriarNovoUsuario() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setEmail("teste@gmail.com");
        usuario.setName("Teste");
        usuario.setPassword("1234");
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);
        when(passwordEncoder.encode("1234")).thenReturn("1234");

        // act
        Usuario usuarioSalvo = usuarioService.save(new RegisterRequestDTO("Teste", "teste@gmail.com", "1234"));

        // Assert
        assertEquals("Teste", usuarioSalvo.getName());
        assertEquals("teste@gmail.com", usuarioSalvo.getEmail());
        assertEquals("1234", usuarioSalvo.getPassword());
        assertEquals(usuarioSalvo, usuario);
    }


}
