package com.estudamais.api.dto;

import jakarta.validation.constraints.NotBlank;

public record AutenticacaoDTO(
        @NotBlank(message = "O campo email é obrigatório")
        String email,
        @NotBlank(message = "O campo senha é obrigatório")
        String senha) {
}
