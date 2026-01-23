package com.example.backend.model.dto;

import java.util.List;

public record SessaoFinalizadaDTO(Integer minutos, String resumo, List<String> topicos) {
}
