package com.estuda_mais.api.controller;

import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.service.TokenService;
import com.estuda_mais.api.service.UsuarioService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UsuarioControllerTest {
    @Mock
    private UsuarioService usuarioService;
    @Mock
    private TokenService tokenService;
    @InjectMocks
    private UsuarioController usuarioController;

    @Test
    @DisplayName("Deve retornar lista de usuários com status 200 OK")
    void deveRetornarListaDeTodosOsUsuarios() {
        // arrange
        Usuario usuario = new Usuario();
        List<Usuario> listaFicticia = List.of(usuario);
        when(usuarioService.findAll()).thenReturn(listaFicticia);

        // act
        ResponseEntity<List<Usuario>> resposta = usuarioController.findAll();

        // assert
        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        assertEquals(listaFicticia, resposta.getBody());
        assertEquals(1, resposta.getBody().size());
    }
}