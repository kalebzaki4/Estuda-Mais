package com.example.backend.controller;

import com.example.backend.model.Usuario;
import com.example.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/{email}")
    public Usuario buscar(@PathVariable String email) {
        return usuarioService.buscarPorEmail(email);
    }

    @PostMapping("/cadastrar")
    public String cadastrar(@RequestBody Usuario usuario) {
        usuarioService.criarUsuario(usuario);
        return "Usuário cadastrado com sucesso!";
    }

    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {
        boolean valido = usuarioService.validarCredenciais(usuario.getEmail(), usuario.getSenha());
        return valido ? "Login realizado!" : "Erro no login";
    }

    @PutMapping("/atualizar")
    public String atualizar(@RequestBody Usuario usuario) {
        usuarioService.atualizarUsuario(usuario);
        return "Usuário atualizado com sucesso!";
    }

    @DeleteMapping("/deletar/{email}")
    public String deletar(@PathVariable String email) {
        usuarioService.deletarUsuario(email);
        return "Usuário deletado com sucesso!";
    }

}