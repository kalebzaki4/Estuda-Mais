package com.estudamais.api_estudos.controller;

import com.estudamais.api_estudos.model.TopicoEstudo; // Importa a classe TopicoEstudo do pacote 'model'
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@RestController // Marca a classe como um Controller REST
@RequestMapping("/api/topicos-estudo") // Define o caminho base para todos os endpoints nesta classe
@CrossOrigin(origins = "*") // Permite requisições de qualquer origem (CORS) - IMPORTANTE para o frontend
public class TopicoEstudoController {

    private final List<TopicoEstudo> topicos = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    public TopicoEstudoController() {
        topicos.add(new TopicoEstudo(counter.incrementAndGet(), "Desenvolvimento Web", "Hoje", "3h 15min", "85%", "W",
                "Este tópico abrange HTML, CSS, JavaScript, React e Node.js. Foco em construir aplicações web modernas e responsivas.",
                15,
                Arrays.asList("18/07/2025 - 1h 30min - React Hooks", "17/07/2025 - 45min - Tailwind CSS"),
                Arrays.asList("https://www.youtube.com/watch?v=react-course", "https://www.youtube.com/watch?v=tailwind-guide")));

        topicos.add(new TopicoEstudo(counter.incrementAndGet(), "Estruturas de Dados", "Ontem", "2h 00min", "60%", "D",
                "Estudo de estruturas de dados fundamentais como listas, árvores, grafos e algoritmos de busca e ordenação. Essencial para otimização de código.",
                10,
                Arrays.asList("17/07/2025 - 1h 00min - QuickSort", "16/07/2025 - 1h 00min - Pilhas e Filas"),
                Arrays.asList("https://www.youtube.com/watch?v=data-structures")));

        topicos.add(new TopicoEstudo(counter.incrementAndGet(), "Inteligência Artificial", "2 dias atrás", "1h 45min", "40%", "AI",
                "Introdução aos conceitos de Inteligência Artificial, Machine Learning e Deep Learning. Explorando redes neurais e processamento de linguagem natural.",
                7,
                Arrays.asList("16/07/2025 - 45min - Redes Neurais", "15/07/2025 - 1h 00min - Fundamentos ML"),
                Arrays.asList("https://www.youtube.com/watch?v=ai-intro")));
    }

    @GetMapping
    public List<TopicoEstudo> getAllTopicos() {
        return topicos;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TopicoEstudo> getTopicoById(@PathVariable Long id) {
        Optional<TopicoEstudo> topico = topicos.stream()
                .filter(t -> t.getId().equals(id))
                .findFirst();
        return topico.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TopicoEstudo> createTopico(@RequestBody TopicoEstudo newTopico) {
        newTopico.setId(counter.incrementAndGet());
        topicos.add(newTopico);
        return new ResponseEntity<>(newTopico, HttpStatus.CREATED);
    }

    @PutMapping("/{id}") // Mapeia requisições PUT para /api/topicos-estudo/{id}
    public ResponseEntity<TopicoEstudo> updateTopico(@PathVariable Long id, @RequestBody TopicoEstudo updatedTopico) {
        Optional<TopicoEstudo> existingTopico = topicos.stream()
                .filter(t -> t.getId().equals(id))
                .findFirst();

        if (existingTopico.isPresent()) {
            TopicoEstudo topico = existingTopico.get();
            topico.setNome(updatedTopico.getNome());
            topico.setUltimaSessao(updatedTopico.getUltimaSessao());
            topico.setTempoTotal(updatedTopico.getTempoTotal());
            topico.setProgresso(updatedTopico.getProgresso());
            topico.setAvatar(updatedTopico.getAvatar());
            topico.setDescription(updatedTopico.getDescription());
            topico.setSessionsCompleted(updatedTopico.getSessionsCompleted());
            topico.setRecentActivities(updatedTopico.getRecentActivities());
            topico.setYoutubeLinks(updatedTopico.getYoutubeLinks());
            return ResponseEntity.ok(topico);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}") // Mapeia requisições DELETE para /api/topicos-estudo/{id}
    public ResponseEntity<Void> deleteTopico(@PathVariable Long id) {
        boolean removed = topicos.removeIf(t -> t.getId().equals(id));
        if (removed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
