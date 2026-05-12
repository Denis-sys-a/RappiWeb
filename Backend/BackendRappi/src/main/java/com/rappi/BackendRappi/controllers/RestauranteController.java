package com.rappi.BackendRappi.controllers;
import com.rappi.BackendRappi.models.Restaurante;
import com.rappi.BackendRappi.repositories.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurantes")
@CrossOrigin(origins = "*")
public class RestauranteController {

    @Autowired
    private RestauranteRepository restauranteRepository;

    @GetMapping
    public List<Restaurante> getAll() {
        return restauranteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Restaurante getById(@PathVariable Long id) {
        return restauranteRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Restaurante create(@RequestBody Restaurante restaurante) {
        return restauranteRepository.save(restaurante);
    }

    @PutMapping("/{id}")
    public Restaurante update(@PathVariable Long id, @RequestBody Restaurante restaurante) {
        restaurante.setId(id);
        return restauranteRepository.save(restaurante);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        restauranteRepository.deleteById(id);
    }
    
}
