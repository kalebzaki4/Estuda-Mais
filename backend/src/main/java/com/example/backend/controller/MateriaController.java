package com.example.backend.controller;

import com.example.backend.model.Materia;
import com.example.backend.repository.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/materias")
@CrossOrigin(origins = "http://localhost:5173")
public class MateriaController {

    @Autowired
    private MateriaRepository repository;

    @GetMapping
    public List<Materia> listarTodas() {
        return repository.findAll();
    }

    @GetMapping("/buscar")
    public List<Materia> buscar(@RequestParam String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    @PostMapping
    public ResponseEntity<Materia> criarMateria(@RequestBody Materia materia) {
        Optional<Materia> materiaExistente = repository.findByNomeIgnoreCase(materia.getNome());

        if (materiaExistente.isPresent()) {
            return ResponseEntity.ok(materiaExistente.get());
        }

        Materia novaMateria = repository.save(materia);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaMateria);
    }
}