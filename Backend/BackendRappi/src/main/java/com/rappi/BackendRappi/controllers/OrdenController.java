package com.rappi.BackendRappi.controllers;
import com.rappi.BackendRappi.models.Orden;
import com.rappi.BackendRappi.repositories.OrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ordenes")
@CrossOrigin(origins = "*")
public class OrdenController {

    @Autowired
    private OrdenRepository ordenRepository;

    @GetMapping
    public List<Orden> getAll() {
        return ordenRepository.findAll();
    }

    @GetMapping("/{id}")
    public Orden getById(@PathVariable Long id) {
        return ordenRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Orden create(@RequestBody Orden orden) {
        return ordenRepository.save(orden);
    }

    @PutMapping("/{id}")
    public Orden update(@PathVariable Long id, @RequestBody Orden orden) {
        orden.setId(id);
        return ordenRepository.save(orden);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        ordenRepository.deleteById(id);
    }
    
}
