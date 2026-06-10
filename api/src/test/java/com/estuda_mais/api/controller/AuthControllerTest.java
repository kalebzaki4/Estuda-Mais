package com.estuda_mais.api.controller;

import com.estuda_mais.api.domain.usuario.LoginRequestDTO;
import com.estuda_mais.api.domain.usuario.RegisterRequestDTO;
import com.estuda_mais.api.domain.usuario.UsuarioResponseDTO;
import com.estuda_mais.api.domain.usuario.Usuario;
import com.estuda_mais.api.infra.security.TokenService;
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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private TokenService tokenService;

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthController authController;

    @Test
    @DisplayName("Deve autenticar usuário e retornar token JWT com status 200 OK")
    void deveFazerLoginComSucesso() {
        // arrange
        LoginRequestDTO loginRequest = new LoginRequestDTO("aluno@email.com", "senha123");
        Authentication authenticationMock = mock(Authentication.class);
        Usuario usuarioMock = new Usuario();
        usuarioMock.setEmail("aluno@email.com");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authenticationMock);
        when(authenticationMock.getPrincipal()).thenReturn(usuarioMock);
        when(tokenService.generateToken(usuarioMock)).thenReturn("token-jwt-gerado-com-sucesso");

        // act
        ResponseEntity<String> resposta = authController.login(loginRequest);

        // assert
        assertEquals(HttpStatus.OK, resposta.getStatusCode());
        assertEquals("token-jwt-gerado-com-sucesso", resposta.getBody());
    }

    @Test
    @DisplayName("Deve registrar um novo usuário e retornar status 201 Created")
    void deveRegistrarUsuarioComSucesso() {
        // arrange
        RegisterRequestDTO registerDTO = new RegisterRequestDTO("Kaleb", "kaleb@email.com", "senha123");
        Usuario usuarioSalvo = new Usuario();
        usuarioSalvo.setId(10L);
        usuarioSalvo.setName("Kaleb");
        usuarioSalvo.setEmail("kaleb@email.com");

        when(usuarioService.save(registerDTO)).thenReturn(usuarioSalvo);

        // act
        ResponseEntity<UsuarioResponseDTO> resposta = authController.register(registerDTO);

        // assert
        assertEquals(HttpStatus.CREATED, resposta.getStatusCode());
        Assertions.assertNotNull(resposta.getBody());
        assertEquals(10L, resposta.getBody().id());
        assertEquals("Kaleb", resposta.getBody().name());
        assertEquals("kaleb@email.com", resposta.getBody().email());
    }
}