package com.workshop.notes_api;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteRepository repo;

    public NoteController(NoteRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Note> list() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getOne(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Note> create(@Valid @RequestBody Note input) {
        input.setId(null);
        input.setCreatedAt(Instant.now());
        return ResponseEntity.status(201).body(repo.save(input));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> update(@PathVariable Long id, @RequestBody Note input) {
        return repo.findById(id).map(n -> {
            n.setTitle(input.getTitle());
            n.setContent(input.getContent());
            return ResponseEntity.ok(repo.save(n));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}