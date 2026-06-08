package com.estuda_mais.api;

import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.repository.UsuarioRepository;
import com.estuda_mais.api.service.UsuarioService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

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
    @DisplayName("Deve achar todos os usuários")
    void deveAcharTodosOsUsuarios() {
        // arrange
        Usuario usuario = new Usuario();
        Usuario usuario2 = new Usuario();
        when(usuarioRepository.findAll()).thenReturn(List.of(usuario, usuario2));

        //act
        usuarioService.findAll();

        //assert
        Assertions.assertEquals(2, usuarioService.findAll().size());
    }

    @Test
    @DisplayName("Deve retornar lista vazia quando não houver usuário")
    void deveRetornarListaVaziaQuandoNaoHouverUsuario() {
        // arrange
        when(usuarioRepository.findAll()).thenReturn(List.of());

        // act
        var resultado = usuarioService.findAll();

        // assert
        Assertions.assertEquals(0, resultado.size());
    }

    @Test
    @DisplayName("Deve achar usuário por ID")
    void deveAcharUsuarioPorId() {
        // arrange
        Usuario usuario = new Usuario();
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        // act
        var resultado = usuarioService.findById(1L);
        // assert
        Assertions.assertEquals(usuario, resultado);
    }
}
