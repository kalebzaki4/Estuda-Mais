package com.estudamais.api_estudos.controller;

import com.estudamais.api_estudos.model.User;
import com.estudamais.api_estudos.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication; // Importa Authentication
import org.springframework.security.core.context.SecurityContextHolder; // Importa SecurityContextHolder
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*") // Permite requisições de qualquer origem (CORS)
public class ProfileController {

    private final UserRepository userRepository;

    public ProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Endpoint para obter o perfil do usuário autenticado
    @GetMapping
    public ResponseEntity<User> getUserProfile() {
        // Obtém o objeto de autenticação do contexto de segurança
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // O nome de usuário do usuário autenticado

        Optional<User> userOptional = userRepository.findByUsername(username);

        return userOptional.map(user -> {
            // Retorna o usuário, mas pode-se criar um DTO para evitar expor a senha
            user.setPassword(null); // Nunca envie a senha de volta para o frontend
            return ResponseEntity.ok(user);
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()); // 404 se não encontrar (embora improvável para autenticado)
    }

    // Endpoint para atualizar o perfil do usuário autenticado
    @PutMapping
    public ResponseEntity<User> updateProfile(@RequestBody User updatedUser) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // O nome de usuário do usuário autenticado

        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User userToUpdate = userOptional.get();
            // Atualiza apenas os campos permitidos para edição pelo usuário
            userToUpdate.setEmail(updatedUser.getEmail() != null ? updatedUser.getEmail() : userToUpdate.getEmail());
            userToUpdate.setProfilePictureUrl(updatedUser.getProfilePictureUrl()); // Atualiza a URL da foto

            User savedUser = userRepository.save(userToUpdate);
            savedUser.setPassword(null); // Não envie a senha de volta
            return ResponseEntity.ok(savedUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 se não encontrar
        }
    }
}
