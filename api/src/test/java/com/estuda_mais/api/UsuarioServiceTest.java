package com.estuda_mais.api;

import com.estuda_mais.api.dto.RegisterRequestDTO;
import com.estuda_mais.api.dto.UsuarioUpdateDTO;
import com.estuda_mais.api.exception.EmailJaCadastradoException;
import com.estuda_mais.api.exception.UsuarioNaoEncontradoException;
import com.estuda_mais.api.model.Usuario;
import com.estuda_mais.api.repository.UsuarioRepository;
import com.estuda_mais.api.service.UsuarioService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    @DisplayName("Deve achar todos os usuários")
    void deveAcharTodosOsUsuarios() {
        // arrange
        Usuario usuario1 = new Usuario();
        Usuario usuario2 = new Usuario();
        when(usuarioRepository.findAll()).thenReturn(List.of(usuario1, usuario2));

        // act
        List<Usuario> resultado = usuarioService.findAll();

        // assert
        Assertions.assertEquals(2, resultado.size());
    }

    @Test
    @DisplayName("Deve retornar lista vazia quando não houver usuário")
    void deveRetornarListaVaziaQuandoNaoHouverUsuario() {
        // arrange
        when(usuarioRepository.findAll()).thenReturn(List.of());

        // act
        List<Usuario> resultado = usuarioService.findAll();

        // assert
        Assertions.assertEquals(0, resultado.size());
    }

    @Test
    @DisplayName("Deve achar usuário por ID")
    void deveAcharUsuarioPorId() {
        // arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        // act
        Usuario resultado = usuarioService.findById(1L);

        // assert
        Assertions.assertEquals(usuario, resultado);
    }

    @Test
    @DisplayName("Deve lançar exceção customizada quando usuário não for encontrado por ID")
    void deveLancarExcecaoQuandoUsuarioNaoForEncontradoPorId() {
        // arrange
        when(usuarioRepository.findById(1L)).thenReturn(Optional.empty());

        // act & assert
        Assertions.assertThrows(UsuarioNaoEncontradoException.class, () -> usuarioService.findById(1L));
    }

    @Test
    @DisplayName("Deve criar um novo usuário com a senha criptografada")
    void deveCriarUmNovoUsuario() {
        // arrange
        RegisterRequestDTO dto = new RegisterRequestDTO("Teste", "teste@gmail.com", "123456");

        Usuario usuarioSalvo = new Usuario();
        usuarioSalvo.setName(dto.name());
        usuarioSalvo.setEmail(dto.email());
        usuarioSalvo.setPassword("senha_criptografada");

        when(usuarioRepository.existsByEmail(dto.email())).thenReturn(false);
        when(passwordEncoder.encode(dto.password())).thenReturn("senha_criptografada");
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioSalvo);

        // act
        Usuario resultado = usuarioService.save(dto);

        // assert
        Assertions.assertNotNull(resultado);
        Assertions.assertEquals("Teste", resultado.getName());
        Assertions.assertEquals("senha_criptografada", resultado.getPassword());
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    @DisplayName("Deve lançar exceção quando tentar cadastrar email duplicado")
    void deveLancarExcecaoQuandoEmailJaEstiverCadastrado() {
        // arrange
        RegisterRequestDTO registerRequestDTO = new RegisterRequestDTO("Teste", "teste@gmail.com", "123456");
        when(usuarioRepository.existsByEmail(registerRequestDTO.email())).thenReturn(true);

        // act & assert
        Assertions.assertThrows(EmailJaCadastradoException.class, () -> usuarioService.save(registerRequestDTO));
    }

    @Test
    @DisplayName("Deve atualizar um usuário existente com sucesso")
    void deveAtualizarUmUsuarioExistente() {
        // arrange
        Long id = 1L;
        Usuario usuarioExistente = new Usuario();
        usuarioExistente.setId(id);
        usuarioExistente.setName("Nome Antigo");
        usuarioExistente.setEmail("antigo@gmail.com");

        UsuarioUpdateDTO updateDTO = new UsuarioUpdateDTO("Nome Novo", "novo@gmail.com", "654321");

        when(usuarioRepository.findById(id)).thenReturn(Optional.of(usuarioExistente));
        when(passwordEncoder.encode(updateDTO.password())).thenReturn("nova_senha_criptografada");
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioExistente);

        // act
        Usuario resultado = usuarioService.update(id, updateDTO);

        // assert
        Assertions.assertNotNull(resultado);
        Assertions.assertEquals("Nome Novo", resultado.getName());
        Assertions.assertEquals("novo@gmail.com", resultado.getEmail());
        verify(usuarioRepository, times(1)).save(usuarioExistente);
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar atualizar um usuário inexistente")
    void deveLancarExcecaoQuandoTentarAtualizarUmUsuarioQueNaoExiste() {
        // arrange
        Long id = 1L;
        UsuarioUpdateDTO usuarioUpdateDTO = new UsuarioUpdateDTO("Teste Atualizado", "teste@gmail.com", "654321");
        when(usuarioRepository.findById(id)).thenReturn(Optional.empty());

        // act & assert
        Assertions.assertThrows(UsuarioNaoEncontradoException.class, () -> usuarioService.update(id, usuarioUpdateDTO));
    }

    @Test
    @DisplayName("Deve deletar um usuário existente")
    void deveDeletarUmUsuarioExistente() {
        // arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setName("Usuario Teste");

        // act
        usuarioService.delete(usuario);

        // assert
        verify(usuarioRepository, times(1)).delete(usuario);
    }
}