package com.estuda_mais.api.infra.exception;

public class ErroAoGerarTokenException extends RuntimeException {
    public ErroAoGerarTokenException(String message) {
        super(message);
    }
}
