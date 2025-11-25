package com.estuda_mais.backend.repository;

import com.estuda_mais.backend.model.Estudo; // Usa o novo nome do Model
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstudoRepository extends JpaRepository<Estudo, String> {
    List<Estudo> findByUsuarioId(String usuarioId);
}