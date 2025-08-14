package com.estudamais.backend.service;

import com.estudamais.backend.model.Disciplina;
import com.estudamais.backend.repository.DisciplinaRepository; // Importe o Repository
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

// Habilita as anotações do Mockito
@ExtendWith(MockitoExtension.class)
class DisciplinaServiceTest {

    @Mock
    private DisciplinaRepository disciplinaRepository;

    @InjectMocks
    private DisciplinaService disciplinaService;

    @Test
    void salvarDeveRetornarDisciplinaSalva() {
        // Arrange
        Disciplina novaDisciplina = new Disciplina();
        novaDisciplina.setNome("Matemática");

        when(disciplinaRepository.save(any(Disciplina.class))).thenReturn(novaDisciplina);

        // Act
        Disciplina disciplinaSalva = disciplinaService.salvar(novaDisciplina);

        // Assert
        assertNotNull(disciplinaSalva);
        assertEquals("Matemática", disciplinaSalva.getNome());
        verify(disciplinaRepository, times(1)).save(novaDisciplina);
    }

    @Test
    void buscarPorIdDeveRetornarDisciplinaExistente() {
        // Arrange
        Long id = 1L;
        Disciplina disciplina = new Disciplina(id, "História");

        when(disciplinaRepository.findById(id)).thenReturn(Optional.of(disciplina));

        // Act
        Optional<Disciplina> resultado = disciplinaService.buscarPorId(id);

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals("História", resultado.get().getNome());
    }
}