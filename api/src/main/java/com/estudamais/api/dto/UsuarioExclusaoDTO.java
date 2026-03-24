package com.estudamais.api.dto;

import jakarta.validation.constraints.NotBlank;

public record UsuarioExclusaoDTO(
        @NotBlank
        String email,
        @NotBlank
        String senha) {
}
