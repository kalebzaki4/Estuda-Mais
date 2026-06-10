package com.estuda_mais.api.domain.usuario;

public record RegisterRequestDTO(
        String name,
        String email,
        String password) {
}
