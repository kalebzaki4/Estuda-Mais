package com.estudamais.api.infra.exception;

import com.estudamais.api.dto.ErroRespostaDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.estudamais.api.infra.config.exception.ResourceNotFoundException;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // erro 404
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErroRespostaDTO> handleResourceNotFoundException(ResourceNotFoundException ex) {
        var erro = new ErroRespostaDTO(LocalDateTime.now(), 404, "Not Found", ex.getMessage());
        return ResponseEntity.status(404).body(erro);
    }

    // erro 400
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroRespostaDTO> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        var erros = ex.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));

        var erro = new ErroRespostaDTO(LocalDateTime.now(), 400, "Requisição Inválida", erros);
        return ResponseEntity.badRequest().body(erro);
    }
}