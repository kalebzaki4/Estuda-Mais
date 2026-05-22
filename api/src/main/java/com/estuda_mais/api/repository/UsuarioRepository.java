package com.estuda_mais.api.repository;

import com.estuda_mais.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
     Usuario findByEmail(String email);
}
