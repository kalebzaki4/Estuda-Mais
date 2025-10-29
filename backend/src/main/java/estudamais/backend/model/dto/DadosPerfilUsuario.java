package estudamais.backend.model.dto;

import estudamais.backend.model.Usuario;

public record DadosPerfilUsuario(
        Long id,
        String nome,
        String email,
        String accountStatus,
        String lastLogin
) {
    public DadosPerfilUsuario(Usuario usuario) {
        this(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.isEnabled() ? "Ativa" : "Inativa", usuario.getLastLogin());
    }
}