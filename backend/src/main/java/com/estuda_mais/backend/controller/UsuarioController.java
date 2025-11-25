package com.estuda_mais.backend.controller;

import com.estuda_mais.backend.model.Usuario;
import com.estuda_mais.backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    // 1. CRIAR USUÁRIO (POST)
    // O React manda um JSON, o @RequestBody transforma em objeto Usuario Java
    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        return usuarioService.criarConta(usuario);
    }

    // 2. LISTAR TODOS (GET)
    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioService.listarTodosUsuarios();
    }

    // 3. BUSCAR POR ID (GET com parâmetro)
    // Exemplo de uso: /usuarios/123-abc-456
    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable String id) {
        return usuarioService.buscarPorId(id);
    }

    // 4. ATUALIZAR (PUT)
    @PutMapping
    public Usuario atualizar(@RequestBody Usuario usuario) {
        return usuarioService.atualizarUsuario(usuario);
    }

    // 5. DELETAR (DELETE)
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable String id) {
        usuarioService.deletarUsuario(id);
    }
}