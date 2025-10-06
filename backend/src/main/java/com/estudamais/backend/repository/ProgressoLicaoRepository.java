package com.estudamais.backend.repository;

import com.estudamais.backend.model.ProgressoLicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProgressoLicaoRepository extends JpaRepository<ProgressoLicao, Long> {

    Optional<ProgressoLicao> findByUsuarioIdAndLicaoId(Long usuarioId, Long licaoId);

    @Query("SELECT COUNT(p) FROM ProgressoLicao p JOIN p.licao l JOIN l.modulo m WHERE p.usuario.id = :usuarioId AND m.curso.id = :cursoId AND p.completada = true")
    Long countCompletedLessonsInCourse(Long usuarioId, Long cursoId);

    @Query("SELECT COUNT(l) FROM Licao l JOIN l.modulo m WHERE m.curso.id = :cursoId")
    Long countTotalLessonsInCourse(Long cursoId);
}
