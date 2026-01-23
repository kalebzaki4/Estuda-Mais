package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sessao_id")
    private SessaoEstudo sessao;

    @Column(columnDefinition = "TEXT")
    private String conteudo;

    private Integer curtidas = 0;

    private LocalDateTime dataCriacao = LocalDateTime.now();

    @ElementCollection
    @CollectionTable(name = "post_comentarios", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "comentario", columnDefinition = "TEXT")
    private List<String> comentarios = new ArrayList<>();
}
