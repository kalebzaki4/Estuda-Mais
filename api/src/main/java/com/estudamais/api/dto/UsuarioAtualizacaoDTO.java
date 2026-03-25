package com.estudamais.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioAtualizacaoDTO(
        @NotBlank(message = "O campo nome é obrigatório")
        String nome,
        @NotBlank (message = "O campo email é obrigatório")
        @Email String email,
        @NotBlank (message = "O campo senha é obrigatório")
        String senha,
        @NotNull (message = "O campo id é obrigatório")
        Long id) {
}
