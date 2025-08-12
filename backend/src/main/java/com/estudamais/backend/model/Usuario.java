package com.estudamais.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private java.time.LocalDate dataDeCadastro;

    // Relacionamento com SessaoDeEstudo
    @OneToMany(mappedBy = "usuario")
    private List<SessaoDeEstudo> sessoesDeEstudo;

    // Construtores, Getters e Setters
    public Usuario() {}

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public java.time.LocalDate getDataDeCadastro() {
        return dataDeCadastro;
    }

    public void setDataDeCadastro(java.time.LocalDate dataDeCadastro) {
        this.dataDeCadastro = dataDeCadastro;
    }

    public List<SessaoDeEstudo> getSessoesDeEstudo() {
        return sessoesDeEstudo;
    }

    public void setSessoesDeEstudo(List<SessaoDeEstudo> sessoesDeEstudo) {
        this.sessoesDeEstudo = sessoesDeEstudo;
    }
}