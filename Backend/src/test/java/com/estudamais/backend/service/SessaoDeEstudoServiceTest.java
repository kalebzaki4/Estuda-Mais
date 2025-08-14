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
    }

    @Test
    void buscarPorId_DeveRetornarVazio_QuandoSessaoNaoExiste() {
    }

    @Test
    void buscarTodasAsSessoes_DeveRetornarListaDeSessoes() {

    }
}