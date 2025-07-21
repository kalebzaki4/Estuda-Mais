package com.estudamais.api_estudos.config;

import com.estudamais.api_estudos.repository.UserRepository; // Importa UserRepository
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService; // Importa UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException; // Importa UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserRepository userRepository; // Injeta UserRepository

    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Define um UserDetailsService personalizado para o Spring Security
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByUsername(username)
                .map(user -> org.springframework.security.core.userdetails.User
                        .withUsername(user.getUsername())
                        .password(user.getPassword()) // A senha já está codificada
                        .roles("USER") // Define um papel padrão para o usuário
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Desabilita CSRF para facilitar testes
                .authorizeHttpRequests(authorize -> authorize
                        // Permite acesso público aos endpoints de autenticação (registro e login)
                        .requestMatchers("/api/auth/**").permitAll()
                        // Permite acesso público ao console H2
                        .requestMatchers("/h2-console/**").permitAll()
                        // Permite acesso público aos endpoints de tópicos de estudo
                        .requestMatchers("/api/topicos-estudo/**").permitAll()
                        // Todas as outras requisições (incluindo /api/profile) exigem autenticação
                        .anyRequest().authenticated()
                )
                .httpBasic(); // Habilita autenticação HTTP Basic

        // Necessário para o console H2 funcionar em um iframe (se não for desabilitado o frameOptions)
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));

        return http.build();
    }
}
