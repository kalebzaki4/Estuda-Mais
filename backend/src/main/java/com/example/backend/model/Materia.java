package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "materias")
@Data
public class Materia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String icone;
    private String cor;

    private Integer xpPorTopico;
}
