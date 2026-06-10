package com.estuda_mais.api.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.estuda_mais.api.infra.exception.ErroAoGerarTokenException;
import com.estuda_mais.api.infra.exception.TokenInvalidoOuExpiradoException;
import com.estuda_mais.api.domain.usuario.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(Usuario usuario) {
        try {
            var algoritmo = Algorithm.HMAC256(secret);
            return JWT.create().withIssuer("api-estuda-mais").withSubject(usuario.getEmail()).withExpiresAt(dataExpiracao()).sign(algoritmo);
        } catch (Exception e) {
            throw new ErroAoGerarTokenException("Erro ao gerar token: " + e.getMessage());
        }
    }

    public String getSubject(String token) {
        try {
            var algoritmo = Algorithm.HMAC256(secret);
            return JWT.require(algoritmo).withIssuer("api-estuda-mais").build().verify(token).getSubject();
        } catch (Exception e) {
            throw new TokenInvalidoOuExpiradoException("Token inválido ou expirado");
        }
    }

    private Instant dataExpiracao() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
