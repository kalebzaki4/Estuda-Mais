package com.example.backend.config;

import com.example.backend.model.Materia;
import com.example.backend.repository.MateriaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DadosIniciaisConfig {

    @Bean
    CommandLineRunner carregarDados(MateriaRepository repository) {
        return args -> {
            List<Materia> materiasParaCadastrar = List.of(
                    criarMateria("React", "FaReact", "#61DBFB", 50),
                    criarMateria("Java", "FaJava", "#f89820", 60),
                    criarMateria("Spring Boot", "SiSpringboot", "#6DB33F", 70),
                    criarMateria("MySQL", "SiMysql", "#4479A1", 50),
                    criarMateria("JavaScript", "IoLogoJavascript", "#F7DF1E", 40),
                    criarMateria("TypeScript", "SiTypescript", "#3178C6", 55),
                    criarMateria("Python", "FaPython", "#3776AB", 50),
                    criarMateria("Estrutura de Dados", "FaCode", "#A855F7", 80),
                    criarMateria("Inglês", "FaLanguage", "#FF5733", 45)
            );

            int novosCadastros = 0;
            for (Materia m : materiasParaCadastrar) {
                if (repository.findByNomeIgnoreCase(m.getNome()).isEmpty()) {
                    repository.save(m);
                    novosCadastros++;
                }
            }

            if (novosCadastros > 0) {
                System.out.println("✅ " + novosCadastros + " novas matérias cadastradas com sucesso!");
            } else {
                System.out.println("ℹ️ Todas as matérias já estão presentes no banco de dados.");
            }
        };
    }

    private Materia criarMateria(String nome, String icone, String cor, int xp) {
        Materia m = new Materia();
        m.setNome(nome);
        m.setIcone(icone);
        m.setCor(cor);
        m.setXpPorTopico(xp);
        return m;
    }
}