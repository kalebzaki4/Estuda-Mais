package com.estuda_mais.backend.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.estuda_mais.backend.model.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    // segredo para assinar e validar os tokens
    @Value("${api.security.token.secret}")
    private String secret;

    // 1️⃣ GERAR TOKEN para o usuário que fez login
    public String generateToken(Usuario usuario) {
        Algorithm algorithm = Algorithm.HMAC256(secret);

        return JWT.create()
                .withIssuer("estuda-mais-backend")
                .withSubject(usuario.getUsername())
                .withExpiresAt(generateExpirationDate())
                .sign(algorithm);
    }

    // 2️⃣ PEGAR LOGIN dentro do token (para validar requisições depois)
    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.require(algorithm)
                    .withIssuer("estuda-mais-backend")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    // 3️⃣ GERAR DATA DE EXPIRAÇÃO (2 horas)
    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
