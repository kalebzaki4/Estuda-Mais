package com.estuda_mais.api.domain.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UsuarioResponseDTO(
        @NotBlank
        Long id,
        @NotBlank
        String name,
        @Email
        @NotBlank
        String email
) {
}
