package com.estuda_mais.api.domain.usuario;

public record UsuarioUpdateDTO(
        String name,
        String email,
        String password) {
}
