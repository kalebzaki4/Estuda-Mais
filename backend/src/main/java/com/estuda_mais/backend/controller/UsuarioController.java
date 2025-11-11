package com.estuda_mais.backend.controller;

import com.estuda_mais.backend.model.Usuario;
import com.estuda_mais.backend.model.UserRole;
import com.estuda_mais.backend.model.LoginRequest;
import com.estuda_mais.backend.model.RegisterRequest;
import com.estuda_mais.backend.security.JwtTokenProvider;
import com.estuda_mais.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException; // Adicionado import para AuthenticationException
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    // GET TESTE
    @GetMapping("/")
    public String listarUsuariosTeste() {
        return "Listagem de usuários - OK!";
    }

    // POST REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> cadastrarUsuario(
            @RequestBody RegisterRequest registerRequest
    ) {
        if (usuarioService.emailExiste(registerRequest.getEmail())) {
            return new ResponseEntity<>("Erro: Email já cadastrado.", HttpStatus.CONFLICT); // 409
        }

        Usuario usuario = new Usuario();
        usuario.setNome(registerRequest.getNome());
        usuario.setEmail(registerRequest.getEmail());
        usuario.setSenha(registerRequest.getSenha()); // A senha será criptografada no service
        usuario.setRole(UserRole.ALUNO); // Definindo a role padrão como ALUNO

        usuarioService.cadastrarUsuario(usuario);

        return new ResponseEntity<>("Usuário '" + usuario.getEmail() + "' cadastrado com sucesso!", HttpStatus.CREATED); // 201
    }

    // POST LOGIN
    @PostMapping("/login")
    public ResponseEntity<String> loginUsuario(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getSenha()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);
            return ResponseEntity.ok(jwt);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Credenciais inválidas.", HttpStatus.UNAUTHORIZED);
        }
    }

    // GET
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuarioPorId(
            @PathVariable Long id
    ) {
        Usuario usuario = usuarioService.buscarPorId(id);

        if (usuario != null) {
            // Retorna o objeto Usuario com status 200 OK
            return ResponseEntity.ok(usuario);
        } else {
            // Retorna status 404 NOT FOUND se o Service não encontrar
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // PUT
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<String> atualizarUsuario(
            @PathVariable Long id,
            @RequestBody Usuario novosDados
    ) {
        // Verifica se o usuário a ser atualizado existe
        if (usuarioService.buscarPorId(id) == null) {
            return new ResponseEntity<>("Erro: Usuário com ID " + id + " não encontrado.", HttpStatus.NOT_FOUND); // 404
        }

        // Garante que o objeto de atualização tenha o ID correto
        novosDados.setId(id);

        // Delega a lógica para o Service (que cuida da senha e save)
        usuarioService.atualizarUsuario(novosDados);

        return ResponseEntity.ok("Usuário com ID: " + id + " atualizado com sucesso!"); // 200
    }

    // DELETE
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletarUsuario(
            @PathVariable Long id
    ) {
        // Verifica se o usuário existe antes de tentar deletar
        if (usuarioService.buscarPorId(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404
        }

        // Chama o Service para deletar
        usuarioService.deletarUsuario(id);

        // Retorna o status 204 NO CONTENT para deleção bem-sucedida sem corpo de resposta
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}