package estudamais.backend.controller;

import estudamais.backend.model.dto.DadosAutenticacao;
import estudamais.backend.model.dto.DadosTokenJWT;
import estudamais.backend.service.JwtTokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import estudamais.backend.model.Usuario;
import estudamais.backend.model.dto.DadosRegistro;
import estudamais.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/auth")
public class AutenticacaoController {

    private static final Logger logger = LoggerFactory.getLogger(AutenticacaoController.class);

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity efetuarLogin(@RequestBody @Valid DadosAutenticacao dados) {
        System.out.println("Attempting to log in with email: " + dados.email());
        var authenticationToken = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());
        System.out.println("Authentication Token Principal: " + authenticationToken.getPrincipal());
        System.out.println("Authentication Token Credentials: " + authenticationToken.getCredentials());
        var authentication = manager.authenticate(authenticationToken);
        logger.info("User authenticated successfully: {}", dados.email());

        Usuario usuario = (Usuario) authentication.getPrincipal();
        usuario.setLastLogin(new java.util.Date().toLocaleString());
        repository.save(usuario);

        var tokenJWT = tokenService.gerarToken(usuario);

        return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
    }

    @PostMapping("/register")
    public ResponseEntity registrar(@RequestBody @Valid DadosRegistro dados) {
        logger.info("Attempting to register user with email: {}", dados.email());
        if (this.repository.findByEmail(dados.email()).isPresent()) {
            logger.warn("Registration failed: User with email {} already exists.", dados.email());
            return ResponseEntity.badRequest().build();
        }
        String encryptedPassword = passwordEncoder.encode(dados.senha());
        Usuario novoUsuario = new Usuario(dados.nome(), dados.email(), encryptedPassword);
        this.repository.save(novoUsuario);
        logger.info("User registered successfully: {}", dados.email());
        return ResponseEntity.ok().build();
    }
}