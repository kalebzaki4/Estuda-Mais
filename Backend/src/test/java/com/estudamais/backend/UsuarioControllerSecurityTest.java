package com.estudamais.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UsuarioControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void deveNegarAcessoSemAutenticacao() throws Exception {
        // Simular uma requisição GET para o endpoint protegido /api/usuarios
        // sem adicionar o cabeçalho de autenticação (Authorization)
        mockMvc.perform(get("/api/usuarios"))
                // Esperar que o status da resposta seja 401 Unauthorized
                .andExpect(status().isUnauthorized());
    }
}