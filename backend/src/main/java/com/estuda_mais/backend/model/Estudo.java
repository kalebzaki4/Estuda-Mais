package com.estuda_mais.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table (name = "Estudo")
public class Estudo {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String codigo;

    @Column (name = "nome", nullable = false)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Version
    private Long version;
}
