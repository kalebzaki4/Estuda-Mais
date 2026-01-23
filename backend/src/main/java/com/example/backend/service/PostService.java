package com.example.backend.service;

import com.example.backend.model.Post;
import com.example.backend.model.SessaoEstudo;
import com.example.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Post criarPostDeSessao(SessaoEstudo sessao) {
        Post post = new Post();
        post.setUsuario(sessao.getUsuario());
        post.setSessao(sessao);
        post.setConteudo(sessao.getResumo());
        return postRepository.save(post);
    }

    public List<Post> getFeed() {
        return postRepository.findAllByOrderByDataCriacaoDesc();
    }

    public Post curtirPost(Long id) {
        Post post = postRepository.findById(id).orElseThrow();
        post.setCurtidas(post.getCurtidas() + 1);
        return postRepository.save(post);
    }

    public Post adicionarComentario(Long id, String comentario) {
        Post post = postRepository.findById(id).orElseThrow();
        post.getComentarios().add(comentario);
        return postRepository.save(post);
    }
}
