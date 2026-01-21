package com.example.backend.model;

import com.example.backend.model.Materia;
import com.example.backend.model.Usuario;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sessoes_estudo")
@Data
public class SessaoEstudo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Materia materia;

    @ManyToOne
    private Usuario usuario;

    private Integer duracaoPlanejada;
    private Integer duracaoRealizada = 0;
    private Integer progresso = 0;

    @ElementCollection
    private List<String> topicosEstudados = new ArrayList<>();

    private LocalDateTime dataInicio = LocalDateTime.now();
    private Integer xpGanhosTotal = 0;
    private boolean concluida = false;
}