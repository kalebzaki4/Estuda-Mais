package estudamais.backend.service;

import estudamais.backend.model.Usuario;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

// Serviço responsável pela geração e validação de tokens JWT
@Service
public class JwtTokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    // Gera um token JWT para o usuário fornecido
    public String gerarToken(Usuario usuario) {
        try {
            // Define o algoritmo de assinatura com a chave secreta
            Algorithm algoritmo = Algorithm.HMAC256(secret);

            return JWT.create()
                    .withIssuer("EstudaMais-API")
                    .withSubject(usuario.getEmail())
                    .withExpiresAt(dataDeExpiracao())
                    .sign(algoritmo);

        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar token JWT", exception);
        }
    }

    // Valida o token JWT e retorna o assunto (subject) se válido
    public String validarToken(String token) {
        try {
            Algorithm algoritmo = Algorithm.HMAC256(secret);

            return JWT.require(algoritmo)
                    .withIssuer("EstudaMais-API")
                    .build()
                    .verify(token)
                    .getSubject();

        } catch (JWTVerificationException exception) {
            return "";
        }
    }

    // Define a data de expiração do token (2 horas a partir do momento atual)
    private Instant dataDeExpiracao() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
