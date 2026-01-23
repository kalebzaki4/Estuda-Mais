package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Entity
@Table(name = "materias")
@Data
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome da matéria é obrigatório")
    @Column(nullable = false, unique = true, length = 100)
    private String nome;

    @NotBlank(message = "O ícone é obrigatório")
    @Column(nullable = false)
    private String icone;

    @NotBlank(message = "A cor é obrigatória")
    @Column(nullable = false, length = 20)
    private String cor;

    @Positive(message = "O XP por tópico deve ser um valor positivo")
    @Column(nullable = false)
    private Integer xpPorTopico = 50;
}