package com.estudamais.backend.service;

import com.estudamais.backend.model.Usuario;
import com.estudamais.backend.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService service;

    private Usuario usuario;

    @BeforeEach
    void setUp() {
        usuario = new Usuario();
        usuario.setEmail("teste@email.com");
        usuario.setSenha("senha123");
        usuario.setId(1L); 
    }


    @Test
    void deveCadastrarUsuario() {
        when(usuarioRepository.save(any(Usuario.class)))
                .thenReturn(usuario);

        Usuario usuarioSalvo = service.cadastrarUsuario(usuario);

        assertEquals(usuario, usuarioSalvo);

        verify(usuarioRepository, times(1)).save(usuario);
    }

    @Test
    void deveBuscarPorEmail() {

        when(usuarioRepository.findByEmail(usuario.getEmail()))
                .thenReturn(Optional.of(usuario));


        Optional<Usuario> resultado = service.buscarPorEmail(usuario.getEmail());

        assertTrue(resultado.isPresent());

        assertEquals(usuario, resultado.get());

        verify(usuarioRepository, times(1)).findByEmail(usuario.getEmail());
    }


    @Test
    void deveRetornarVazioQuandoEmailNaoExistir() {

        when(usuarioRepository.findByEmail("naoexiste@email.com"))
                .thenReturn(Optional.empty());

        Optional<Usuario> resultado = service.buscarPorEmail("naoexiste@email.com");

        assertTrue(resultado.isEmpty());
    }

    @Test
    void deveRealizarLoginComSucesso() {

        when(usuarioRepository.findByEmail(usuario.getEmail()))
                .thenReturn(Optional.of(usuario));


        Optional<Usuario> usuarioLogado = service.realizarLogin(usuario.getEmail(), usuario.getSenha());

        assertTrue(usuarioLogado.isPresent());
        assertEquals(usuario, usuarioLogado.get());
        verify(usuarioRepository, times(1)).findByEmail(usuario.getEmail());
    }

    @Test
    void deveFalharNoLoginComSenhaIncorreta() {
        when(usuarioRepository.findByEmail(usuario.getEmail()))
                .thenReturn(Optional.of(usuario));

        Optional<Usuario> usuarioLogado = service.realizarLogin(usuario.getEmail(), "senhaErrada");

        assertTrue(usuarioLogado.isEmpty());
        verify(usuarioRepository, times(1)).findByEmail(usuario.getEmail());
    }

    @Test
    void deveFalharNoLoginComEmailInexistente() {
        when(usuarioRepository.findByEmail("inexistente@email.com"))
                .thenReturn(Optional.empty());

        Optional<Usuario> usuarioLogado = service.realizarLogin("inexistente@email.com", "senhaQualquer");

        assertTrue(usuarioLogado.isEmpty());
        verify(usuarioRepository, times(1)).findByEmail("inexistente@email.com");
    }
}