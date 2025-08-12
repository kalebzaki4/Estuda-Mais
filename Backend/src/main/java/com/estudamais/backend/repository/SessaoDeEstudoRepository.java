package com.estudamais.backend.repository;

import com.estudamais.backend.model.SessaoDeEstudo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessaoDeEstudoRepository extends JpaRepository<SessaoDeEstudo, Long> {
}
