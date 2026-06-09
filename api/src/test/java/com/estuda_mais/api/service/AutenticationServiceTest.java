package com.estuda_mais.api.service;

import com.estuda_mais.api.exception.UsuarioNaoEncontradoException;
import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.repository.UsuarioRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AutenticationServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private AutenticationService autenticationService;

    @Test
    @DisplayName("Deve retornar UserDetails quando o usuário for encontrado pelo email")
    void deveRetornarUserDetailsQuandoUsuarioForEncontrado() {
        // arrange
        String email = "usuario@gmail.com";
        Usuario usuarioMock = new Usuario();
        usuarioMock.setEmail(email);
        usuarioMock.setPassword("senha_cripto");

        when(usuarioRepository.findByEmail(email)).thenReturn(Optional.of(usuarioMock));

        // act
        UserDetails resultado = autenticationService.loadUserByUsername(email);

        // assert
        Assertions.assertNotNull(resultado);
        Assertions.assertEquals(usuarioMock, resultado);
        verify(usuarioRepository, times(1)).findByEmail(email);
    }

    @Test
    @DisplayName("Deve lançar UsuarioNaoEncontradoException quando o email não existir no banco")
    void deveLancarExcecaoQuandoUsuarioNaoForEncontrado() {
        // arrange
        String email = "inexistente@gmail.com";
        when(usuarioRepository.findByEmail(email)).thenReturn(Optional.empty());

        // act & assert
        Assertions.assertThrows(UsuarioNaoEncontradoException.class, () -> {
            autenticationService.loadUserByUsername(email);
        });

        verify(usuarioRepository, times(1)).findByEmail(email);
    }
}