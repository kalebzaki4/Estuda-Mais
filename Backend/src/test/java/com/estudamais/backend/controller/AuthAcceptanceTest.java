package com.estudamais.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = com.estudamais.backend.BackendApplication.class)
@AutoConfigureMockMvc
public class AuthAcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void cadastroComDadosValidosDeveRetornarSucesso() throws Exception {
        String json = "{" +
                "\"username\": \"usuarioNovo\"," +
                "\"password\": \"senha123\"," +
                "\"email\": \"email@teste.com\"}";
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("Usuário cadastrado com sucesso!"));
    }

    @Test
    void cadastroComCamposFaltandoDeveRetornarBadRequest() throws Exception {
        String json = "{" +
                "\"username\": \"\"," +
                "\"password\": \"\"," +
                "\"email\": \"\"}";
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Todos os campos são obrigatórios."));
    }

    @Test
    void loginComCredenciaisCorretasDeveRetornarSucesso() throws Exception {
        String json = "{" +
                "\"username\": \"teste\"," +
                "\"password\": \"12345\"}";
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Login bem-sucedido!"));
    }

    @Test
    void loginComCredenciaisInvalidasDeveRetornarUnauthorized() throws Exception {
        String json = "{" +
                "\"username\": \"invalido\"," +
                "\"password\": \"errado\"}";
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Credenciais inválidas."));
    }
}
