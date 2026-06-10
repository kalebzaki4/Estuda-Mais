package com.estuda_mais.api.domain.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(@NotBlank @Email String email, @NotBlank String password) {

}
