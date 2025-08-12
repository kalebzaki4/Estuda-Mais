package com.estudamais.backend.repository;

import com.estudamais.backend.model.MetaDeEstudo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetaDeEstudoRepository extends JpaRepository<MetaDeEstudo, Long> {
}
