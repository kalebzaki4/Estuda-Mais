package com.example.backend.model;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "materia_id", nullable = false)
    private Materia materia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private Integer duracaoPlanejada;

    private Integer duracaoRealizada = 0;

    @Column(columnDefinition = "int default 0")
    private Integer progresso = 0;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "sessao_estudo_topicos", joinColumns = @JoinColumn(name = "sessao_id"))
    @Column(name = "topico")
    private List<String> topicosEstudados = new ArrayList<>();

    @Column(nullable = false)
    private LocalDateTime dataInicio = LocalDateTime.now();

    private Integer xpGanhosTotal = 0;
    private boolean concluida = false;
}