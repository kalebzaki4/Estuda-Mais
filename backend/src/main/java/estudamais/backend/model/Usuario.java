package estudamais.backend.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Usuario {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "nome_usuario", length = 100, nullable = false)
    private String nome;

    @Column(name = "email_usuario", length = 150, nullable = false, unique = true)
    private String email;

    @Column (name = "senha_usuario", length = 255, nullable = false)
    private String senha;

    @Column (name = "ativo", nullable = false)
    private boolean enabled;

    @Column (name = "ultimo_login")
    private String lastLogin;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SessaoEstudo> sessoesDeEstudo = new ArrayList<>();

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

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(String lastLogin) {
        this.lastLogin = lastLogin;
    }

    public List<SessaoEstudo> getSessoesDeEstudo() {
        return sessoesDeEstudo;
    }

    public void setSessoesDeEstudo(List<SessaoEstudo> sessoesDeEstudo) {
        this.sessoesDeEstudo = sessoesDeEstudo;
    }
}