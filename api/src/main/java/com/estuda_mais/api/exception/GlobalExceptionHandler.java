package com.estuda_mais.api.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UsuarioNaoEncontradoException.class)
    public ResponseEntity<String> handleUsuarioNaoEncontradoException(UsuarioNaoEncontradoException ex) {
        return ResponseEntity.status(404).body(ex.getMessage());
    }

    @ExceptionHandler(EmailJaCadastradoException.class)
    public ResponseEntity<String> handleEmailJaCadastradoException(EmailJaCadastradoException ex) {
        return ResponseEntity.status(409).body(ex.getMessage());
    }

    @ExceptionHandler(TokenInvalidoOuExpiradoException.class)
    public ResponseEntity<String> handleTokenInvalidoOuExpiradoException(TokenInvalidoOuExpiradoException ex) {
        return ResponseEntity.status(403).body(ex.getMessage());
    }

    @ExceptionHandler(ErroAoGerarTokenException.class)
    public ResponseEntity<String> handleErroAoGerarTokenException(ErroAoGerarTokenException ex) {
        return ResponseEntity.status(401).body(ex.getMessage());
    }

}
