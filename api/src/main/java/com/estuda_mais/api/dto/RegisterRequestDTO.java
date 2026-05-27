package com.estuda_mais.api.dto;

public record RegisterRequestDTO(
        String name,
        String email,
        String password) {
}
