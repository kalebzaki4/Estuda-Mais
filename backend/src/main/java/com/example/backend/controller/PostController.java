package com.example.backend.controller;

import com.example.backend.model.Post;
import com.example.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<List<Post>> getFeed() {
        return ResponseEntity.ok(postService.getFeed());
    }

    @PostMapping("/{id}/curtir")
    public ResponseEntity<Post> curtirPost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.curtirPost(id));
    }

    @PostMapping("/{id}/comentar")
    public ResponseEntity<Post> adicionarComentario(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String comentario = body.get("comentario");
        return ResponseEntity.ok(postService.adicionarComentario(id, comentario));
    }
}
