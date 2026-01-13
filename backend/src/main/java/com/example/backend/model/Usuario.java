package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table (name = "usuarios")
public class Usuario {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column (name = "nome", nullable = false, length = 50)
    private String nome;

    @Column (name = "email", nullable = false, length = 100, unique = true)
    private String email;

    @Column (name = "senha", nullable = false, length = 255)
    private String senha;

}
