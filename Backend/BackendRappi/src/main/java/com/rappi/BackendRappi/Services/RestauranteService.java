package com.rappi.BackendRappi.Services;
import com.rappi.BackendRappi.models.Restaurante;
import com.rappi.BackendRappi.repositories.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestauranteService {
    @Autowired
    private RestauranteRepository restauranteRepository;

    public List<Restaurante> getAll() {
        return restauranteRepository.findAll();
    }

    public Restaurante getById(Long id) {
        return restauranteRepository.findById(id).orElse(null);
    }

    public Restaurante create(Restaurante restaurante) {
        return restauranteRepository.save(restaurante);
    }

    public Restaurante update(Long id, Restaurante restaurante) {
        restaurante.setId(id);
        return restauranteRepository.save(restaurante);
    }

    public void delete(Long id) {
        restauranteRepository.deleteById(id);
    }
}
