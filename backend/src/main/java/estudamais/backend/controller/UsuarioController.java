package estudamais.backend.controller;

import estudamais.backend.model.Usuario;
import estudamais.backend.model.dto.DadosPerfilUsuario;
import estudamais.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/perfil")
    public ResponseEntity<DadosPerfilUsuario> getPerfilUsuario() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(userEmail);

        if (usuarioOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Usuario usuario = usuarioOptional.get();
        return ResponseEntity.ok(new DadosPerfilUsuario(usuario));
    }
}