package com.estudamais.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerAcceptanceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void deveRegistrarNovoUsuarioComSucesso() throws Exception {
        // Prepara o corpo da requisição de registro
        Map<String, String> registerPayload = new HashMap<>();
        registerPayload.put("username", "novoUsuario");
        registerPayload.put("email", "novo@email.com");
        registerPayload.put("password", "novaSenha123");

        // Simula a requisição POST para o endpoint de registro
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerPayload)))
                // Verifica se o status da resposta é 201 CREATED
                .andExpect(status().isCreated())
                // Verifica se o JSON de resposta contém a mensagem de sucesso
                .andExpect(jsonPath("$.message").value("Usuário cadastrado com sucesso!"))
                // Verifica se o JSON de resposta contém o nome de usuário
                .andExpect(jsonPath("$.username").value("novoUsuario"));
    }
}