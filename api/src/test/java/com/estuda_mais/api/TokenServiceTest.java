package com.estuda_mais.api;

import com.estuda_mais.api.exception.ErroAoGerarTokenException;
import com.estuda_mais.api.exception.TokenInvalidoOuExpiradoException;
import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.service.TokenService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
public class TokenServiceTest {

    @InjectMocks
    private TokenService tokenService;

    private final String SECRET_TESTE = "uma-chave-secreta-muito-segura-e-longa-para-o-teste-123";

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(tokenService, "secret", SECRET_TESTE);
    }

    @Test
    @DisplayName("Deve gerar um token JWT válido com sucesso")
    void deveGerarTokenComSucesso() {
        // arrange
        Usuario usuario = new Usuario();
        usuario.setEmail("estudante@gmail.com");

        // act
        String token = tokenService.generateToken(usuario);

        // assert
        Assertions.assertNotNull(token);
        Assertions.assertFalse(token.isEmpty());
    }

    @Test
    @DisplayName("Deve lançar ErroAoGerarTokenException se o secret for inválido ou nulo")
    void deveLancarExcecaoAoFalharNaGeracao() {
        // arrange
        ReflectionTestUtils.setField(tokenService, "secret", null); // Força o erro na biblioteca JWT
        Usuario usuario = new Usuario();
        usuario.setEmail("estudante@gmail.com");

        // act & assert
        Assertions.assertThrows(ErroAoGerarTokenException.class, () -> {
            tokenService.generateToken(usuario);
        });
    }

    @Test
    @DisplayName("Deve extrair o email (subject) correto de um token válido")
    void deveRetornarSubjectComSucesso() {
        // arrange
        Usuario usuario = new Usuario();
        usuario.setEmail("professor@gmail.com");
        String tokenValido = tokenService.generateToken(usuario);

        // act
        String emailExtraido = tokenService.getSubject(tokenValido);

        // assert
        Assertions.assertEquals("professor@gmail.com", emailExtraido);
    }

    @Test
    @DisplayName("Deve lançar TokenInvalidoOuExpiradoException ao decodificar um token corrompido")
    void deveLancarExcecaoComTokenInvalido() {
        // arrange
        String tokenInvalido = "um-token-completamente-falso-e-mal-formatado";

        // act & assert
        Assertions.assertThrows(TokenInvalidoOuExpiradoException.class, () -> {
            tokenService.getSubject(tokenInvalido);
        });
    }
}