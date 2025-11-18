package com.estuda_mais.backend.repository;

import com.estuda_mais.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
    // Método para encontrar um usuário pelo email
    Optional<Usuario> findByEmail(String email);

    // Método para verificar se um email já está registrado
    boolean existsByEmail(String email);
}
