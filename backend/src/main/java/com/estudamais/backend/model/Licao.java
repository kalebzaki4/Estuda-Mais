package com.estudamais.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "licoes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Licao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    @Enumerated(EnumType.STRING)
    private TipoConteudo tipoConteudo;

    @Column(columnDefinition = "TEXT")
    private String urlConteudo;

    @Column(columnDefinition = "TEXT")
    private String artigoConteudo;

    private int ordem; // Ordem da lição dentro do módulo

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modulo_id")
    private Modulo modulo;
}
