package com.rappi.BackendRappi.repositories;

import com.rappi.BackendRappi.models.Producto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByRestauranteId(Long restauranteId);
}
