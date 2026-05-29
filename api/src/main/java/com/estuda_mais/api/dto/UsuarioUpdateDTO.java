package com.estuda_mais.api.dto;

public record UsuarioUpdateDTO(
        String name,
        String email,
        String password) {
}
