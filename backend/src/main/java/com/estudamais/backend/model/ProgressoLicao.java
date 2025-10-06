package com.estudamais.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "progresso_licoes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"usuario_id", "licao_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProgressoLicao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "licao_id", nullable = false)
    private Licao licao;

    private boolean completada = false;

    private LocalDateTime dataConclusao;
}
