package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table (name = "sessoes_estudo")
@Data
public class SessaoEstudo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String topico;

    @Column(columnDefinition = "TEXT")
    private String oQueEstudou;

    private Integer duracaoMinutos;
    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
