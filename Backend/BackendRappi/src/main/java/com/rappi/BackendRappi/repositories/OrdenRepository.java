package com.rappi.BackendRappi.repositories;

import com.rappi.BackendRappi.models.Orden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {
    
}
