package com.estudamais.backend.filter;

import com.estudamais.backend.service.UsuarioDetailsService;
import com.estudamais.backend.util.JwtTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private UsuarioDetailsService usuarioDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // Se o header Authorization não existir ou não começar com "Bearer ", continua o filtro
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 1. Extrai o token JWT (remove "Bearer ")
        jwt = authHeader.substring(7);
        userEmail = jwtTokenService.extractUsername(jwt);

        // 2. Se o email foi extraído e o usuário não está autenticado no contexto
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Carrega o usuário do banco de dados (H2)
            UserDetails userDetails = this.usuarioDetailsService.loadUserByUsername(userEmail);

            // 3. Valida o token
            if (jwtTokenService.isTokenValid(jwt, userDetails)) {
                // Se válido, cria um objeto de autenticação para o Spring Security
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // 4. Define o usuário no contexto de segurança (autentica a requisição)
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}