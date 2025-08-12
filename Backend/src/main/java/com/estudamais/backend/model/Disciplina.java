package com.estudamais.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class Disciplina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;

    // Relacionamento com SessaoDeEstudo
    @OneToMany(mappedBy = "disciplina")
    private List<SessaoDeEstudo> sessoesDeEstudo;

    // Construtores, Getters e Setters
    public Disciplina() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<SessaoDeEstudo> getSessoesDeEstudo() {
        return sessoesDeEstudo;
    }

    public void setSessoesDeEstudo(List<SessaoDeEstudo> sessoesDeEstudo) {
        this.sessoesDeEstudo = sessoesDeEstudo;
    }
}
