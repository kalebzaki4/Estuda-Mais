package com.estudamais.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Esta classe de configuração habilita o Cross-Origin Resource Sharing (CORS)
// para permitir que o front-end se comunique com o back-end em desenvolvimento.
@Configuration
public class CorsConfig {

    // Define uma política global de CORS mais permissiva para o ambiente de desenvolvimento.
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Aplica a política a todos os endpoints
                        .allowedOrigins("http://localhost:3000") // Permite requisições do seu front-end
                        .allowedMethods("*") // Permite todos os métodos HTTP (GET, POST, PUT, DELETE, etc.)
                        .allowedHeaders("*") // Permite todos os cabeçalhos
                        .allowCredentials(true) // Permite cookies e cabeçalhos de autenticação
                        .maxAge(3600); // Define por quanto tempo a resposta do pré-voo pode ser cacheada
            }
        };
    }
}
