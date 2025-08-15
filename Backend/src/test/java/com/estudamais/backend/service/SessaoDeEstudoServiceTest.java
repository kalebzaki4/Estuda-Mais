package com.estudamais.backend.service;

import com.estudamais.backend.model.SessaoDeEstudo;
import com.estudamais.backend.repository.SessaoDeEstudoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*; // Importação correta para 'when', 'any', 'verify'

@ExtendWith(MockitoExtension.class)
class SessaoDeEstudoServiceTest {

    @Mock
    private SessaoDeEstudoRepository sessaoDeEstudoRepository;

    @InjectMocks
    private SessaoDeEstudoService sessaoDeEstudoService;

    // Teste para o método 'salvar'
    @Test
    void salvar_DeveRetornarSessaoSalva_QuandoSessaoValida() {
        // Arrange
        SessaoDeEstudo novaSessao = new SessaoDeEstudo();
        novaSessao.setTitulo("Estudo de Matemática");
        when(sessaoDeEstudoRepository.save(any(SessaoDeEstudo.class))).thenReturn(novaSessao);

        // Act
        SessaoDeEstudo sessaoSalva = sessaoDeEstudoService.salvar(novaSessao);

        // Assert
        assertNotNull(sessaoSalva);
        assertEquals("Estudo de Matemática", sessaoSalva.getTitulo());


        verify(sessaoDeEstudoRepository, times(1)).save(novaSessao);
    }

    @Test
    void buscarPorId_DeveRetornarSessao_QuandoSessaoExiste() {
        // Arrange
        Long id = 1L;
        SessaoDeEstudo sessaoExistente = new SessaoDeEstudo();
        sessaoExistente.setId(id);
        when(sessaoDeEstudoRepository.findById(id)).thenReturn(Optional.of(sessaoExistente));

        // Act
        Optional<SessaoDeEstudo> sessaoEncontrada = sessaoDeEstudoService.buscarPorId(id);

        // Assert
        assertTrue(sessaoEncontrada.isPresent());
        assertEquals(id, sessaoEncontrada.get().getId());

        verify(sessaoDeEstudoRepository, times(1)).findById(id);
    }

    @Test
    void buscarPorId_DeveRetornarVazio_QuandoSessaoNaoExiste() {
        // Arrange
        Long id = 1L;
        when(sessaoDeEstudoRepository.findById(id)).thenReturn(Optional.empty());

        // Act
        Optional<SessaoDeEstudo> sessaoEncontrada = sessaoDeEstudoService.buscarPorId(id);

        // Assert
        assertFalse(sessaoEncontrada.isPresent());

        verify(sessaoDeEstudoRepository, times(1)).findById(id);
    }

    @Test
    void buscarTodasAsSessoes_DeveRetornarListaDeSessoes() {
        // Arrange
        SessaoDeEstudo sessao1 = new SessaoDeEstudo();
        sessao1.setTitulo("Estudo de Física");
        SessaoDeEstudo sessao2 = new SessaoDeEstudo();
        sessao2.setTitulo("Estudo de Química");
        List<SessaoDeEstudo> sessoes = Arrays.asList(sessao1, sessao2);
        when(sessaoDeEstudoRepository.findAll()).thenReturn(sessoes);

        // Act
        List<SessaoDeEstudo> sessoesEncontradas = sessaoDeEstudoService.buscarTodasAsSessoes();

        // Assert
        assertNotNull(sessoesEncontradas);
        assertEquals(2, sessoesEncontradas.size());
        assertEquals("Estudo de Física", sessoesEncontradas.get(0).getTitulo());
        assertEquals("Estudo de Química", sessoesEncontradas.get(1).getTitulo());

        verify(sessaoDeEstudoRepository, times(1)).findAll();

    }
}