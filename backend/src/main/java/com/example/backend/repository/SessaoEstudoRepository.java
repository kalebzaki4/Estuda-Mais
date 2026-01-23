package com.example.backend.repository;

import com.example.backend.model.SessaoEstudo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SessaoEstudoRepository extends JpaRepository<SessaoEstudo, Long> {
    List<SessaoEstudo> findByUsuarioId(Long usuarioId);

    List<SessaoEstudo> findByUsuarioIdAndDataInicioAfter(Long usuarioId, LocalDateTime data);

    List<SessaoEstudo> findTop5ByUsuarioIdOrderByDataInicioDesc(Long usuarioId);

    List<SessaoEstudo> findByConcluidaTrueAndResumoIsNotNullOrderByDataInicioDesc();
}