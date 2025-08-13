package com.estudamais.backend.dto;

public class AuthResponse {
    private String token;
    private Long id;
    private String nome;

    // Construtor, Getters e Setters
    public AuthResponse(String token, Long id, String nome) {
        this.token = token;
        this.id = id;
        this.nome = nome;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

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
}
