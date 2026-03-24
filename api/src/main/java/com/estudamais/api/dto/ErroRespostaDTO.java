package com.estudamais.api.dto;

import java.time.LocalDateTime;

public record ErroRespostaDTO(
        LocalDateTime timestamp,
        int status,
        String erro,
        String mensagem
) {
}