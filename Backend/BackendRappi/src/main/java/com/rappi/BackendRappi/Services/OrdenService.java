package com.rappi.BackendRappi.Services;

import com.rappi.BackendRappi.models.Orden;
import com.rappi.BackendRappi.repositories.OrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdenService {
    @Autowired
    private OrdenRepository ordenRepository;

    public List<Orden> getAll() {
        return ordenRepository.findAll();
    }

    public Orden getById(Long id) {
        return ordenRepository.findById(id).orElse(null);
    }

    public Orden create(Orden orden) {
        return ordenRepository.save(orden);
    }

    public Orden update(Long id, Orden orden) {
        orden.setId(id);
        return ordenRepository.save(orden);
    }

    public void delete(Long id) {
        ordenRepository.deleteById(id);
    }
}
