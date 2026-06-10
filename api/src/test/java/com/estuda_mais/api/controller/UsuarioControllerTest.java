package com.estuda_mais.api.controller;

import com.estuda_mais.api.domain.usuario.UsuarioUpdateDTO;
import com.estuda_mais.api.domain.usuario.Usuario;
import com.estuda_mais.api.domain.usuario.UsuarioService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioControllerTest {

    @Mock
    private UsuarioService usuarioService;

    @InjectMocks
    private UsuarioController usuarioController;

    @Test
    @DisplayName("Deve retornar lista de usuários com status 200 OK")
    void deveRetornarListaDeTodosOsUsuarios() {
        Usuario usuario = new Usuario();
        List<Usuario> listaFicticia = List.of(usuario);
        when(usuarioService.findAll()).thenReturn(listaFicticia);

        ResponseEntity<List<Usuario>> resposta = usuarioController.findAll();

        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        assertEquals(listaFicticia, resposta.getBody());
        assertEquals(1, resposta.getBody().size());
    }

    @Test
    @DisplayName("Deve retornar usuário por ID com status 201 Created e URI correta")
    void deveRetornarUsuarioPorIdComStatusCreated() {
        Long id = 1L;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        when(usuarioService.findById(id)).thenReturn(usuario);
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString("http://localhost");

        ResponseEntity<Usuario> resposta = usuarioController.findById(id, uriBuilder);

        assertEquals(HttpStatus.CREATED, resposta.getStatusCode());
        assertEquals(usuario, resposta.getBody());
        assertNotNull(resposta.getHeaders().getLocation());
        assertTrue(resposta.getHeaders().getLocation().toString().contains("/usuarios/1"));
    }

    @Test
    @DisplayName("Deve atualizar usuário com sucesso")
    void deveAtualizarUsuarioComSucesso() {
        Long id = 1L;
        UsuarioUpdateDTO dto = new UsuarioUpdateDTO("Novo Nome", "novo@email.com", "senha123");
        Usuario usuarioAtualizado = new Usuario();
        when(usuarioService.update(id, dto)).thenReturn(usuarioAtualizado);

        ResponseEntity<Usuario> resposta = usuarioController.update(id, dto);

        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        assertEquals(usuarioAtualizado, resposta.getBody());
    }

    @Test
    @DisplayName("Deve retornar 404 Not Found ao atualizar se lançar IllegalArgumentException")
    void deveRetornar404AoAtualizarComErro() {
        Long id = 1L;
        UsuarioUpdateDTO dto = new UsuarioUpdateDTO("Novo Nome", "novo@email.com", "senha123");
        when(usuarioService.update(id, dto)).thenThrow(new IllegalArgumentException());

        ResponseEntity<Usuario> resposta = usuarioController.update(id, dto);

        assertEquals(HttpStatus.NOT_FOUND, resposta.getStatusCode());
    }

    @Test
    @DisplayName("Deve deletar usuário com sucesso")
    void deveDeletarUsuarioComSucesso() {
        Long id = 1L;
        Usuario usuario = new Usuario();
        when(usuarioService.findById(id)).thenReturn(usuario);

        ResponseEntity<Void> resposta = usuarioController.delete(id);

        assertEquals(HttpStatus.NO_CONTENT, resposta.getStatusCode());
        verify(usuarioService, times(1)).delete(usuario);
    }

    @Test
    @DisplayName("Deve retornar 404 ao deletar se o usuário não for encontrado")
    void deveRetornar404AoDeletarUsuarioInexistente() {
        Long id = 1L;
        when(usuarioService.findById(id)).thenThrow(new IllegalArgumentException());

        ResponseEntity<Void> resposta = usuarioController.delete(id);

        assertEquals(HttpStatus.NOT_FOUND, resposta.getStatusCode());
        verify(usuarioService, never()).delete(any());
    }
}