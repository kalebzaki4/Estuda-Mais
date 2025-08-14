package com.estudamais.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
public class SessaoDeEstudo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private java.time.LocalDateTime dataInicio;
    private java.time.LocalDateTime dataFim;
    private Long duracaoEmMinutos;
    private String descricao;

    // Relacionamento com Usuario
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // Relacionamento com Disciplina
    @ManyToOne
    @JoinColumn(name = "disciplina_id")
    private Disciplina disciplina;

    // Construtores, Getters e Setters
    public SessaoDeEstudo() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public java.time.LocalDateTime getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(java.time.LocalDateTime dataInicio) {
        this.dataInicio = dataInicio;
    }

    public java.time.LocalDateTime getDataFim() {
        return dataFim;
    }

    public void setDataFim(java.time.LocalDateTime dataFim) {
        this.dataFim = dataFim;
    }

    public Long getDuracaoEmMinutos() {
        return duracaoEmMinutos;
    }

    public void setDuracaoEmMinutos(Long duracaoEmMinutos) {
        this.duracaoEmMinutos = duracaoEmMinutos;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }

    public void setTitulo(String estudoDeMatemática) {
    }

    public String getTitulo() {
        return null;
    }
}
