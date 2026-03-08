package com.estudamais.api.infra.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import jakarta.persistence.EntityNotFoundException;
import java.nio.file.AccessDeniedException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity TratarErro404() {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity TratarErro400(MethodArgumentNotValidException ex) {
        var erro = ex.getFieldErrors();
        return ResponseEntity.badRequest().body(erro.stream().map(DadosErroValidacao::new).toList());
    }

    // Erro de credenciais inválidas (Usuário ou senha errados)
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity TratarErroBadCredentials() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
    }

    // Erro genérico de autenticação
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity TratarErroAutenticacao() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Falha na autenticação");
    }

    // Erro de acesso negado (Usuário logado, mas sem permissão para o recurso)
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity TratarErroAcessoNegado() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado");
    }

    // Erro genérico (500) para evitar expor stacktrace
    @ExceptionHandler(Exception.class)
    public ResponseEntity TratarErro500(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: " + ex.getLocalizedMessage());
    }

    private record DadosErroValidacao(String campo, String mensagem) {
        public DadosErroValidacao(org.springframework.validation.FieldError erro) {
            this(erro.getField(), erro.getDefaultMessage());
        }
    }
}