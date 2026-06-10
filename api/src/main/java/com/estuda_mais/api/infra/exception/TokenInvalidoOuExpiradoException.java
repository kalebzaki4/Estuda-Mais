package com.estuda_mais.api.infra.exception;

public class TokenInvalidoOuExpiradoException extends RuntimeException {
    public TokenInvalidoOuExpiradoException(String message) {
        super(message);
    }
}
