package com.example.backend.repository;

import com.example.backend.model.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MateriaRepository extends JpaRepository<Materia, Long> {
    Optional<Materia> findByNomeIgnoreCase(String nome);

    List<Materia> findByNomeContainingIgnoreCase(String nome);

    @Query("SELECT m FROM Materia m JOIN SessaoEstudo s GROUP BY m ORDER BY COUNT(s) DESC")
    List<Materia> findTopSugestoes();
}