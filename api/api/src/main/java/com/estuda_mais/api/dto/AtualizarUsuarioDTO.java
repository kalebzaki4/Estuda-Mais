package com.estuda_mais.api.dto;

public record AtualizarUsuarioDTO(
        Long id,
        String nome,
        String email,
        String senha) {
}
