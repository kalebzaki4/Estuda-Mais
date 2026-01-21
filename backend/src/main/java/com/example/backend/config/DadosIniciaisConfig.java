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
            if (repository.count() == 0) {
                Materia m1 = new Materia();
                m1.setNome("React");
                m1.setIcone("FaReact");
                m1.setCor("#61DBFB");
                m1.setXpPorTopico(50);

                Materia m2 = new Materia();
                m2.setNome("Java");
                m2.setIcone("FaJava");
                m2.setCor("#f89820");
                m2.setXpPorTopico(60);

                repository.saveAll(List.of(m1, m2));
                System.out.println("✅ Matérias iniciais cadastradas!");
            }
        };
    }
}