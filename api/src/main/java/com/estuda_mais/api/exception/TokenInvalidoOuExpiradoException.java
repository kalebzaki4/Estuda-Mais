package com.estuda_mais.api.exception;

public class TokenInvalidoOuExpiradoException extends RuntimeException {
    public TokenInvalidoOuExpiradoException(String message) {
        super(message);
    }
}
