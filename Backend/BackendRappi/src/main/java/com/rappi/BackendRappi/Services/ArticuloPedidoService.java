package com.rappi.BackendRappi.Services;
import com.rappi.BackendRappi.models.ArticuloPedido;
import com.rappi.BackendRappi.repositories.ArticulopedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticuloPedidoService {
    @Autowired
    private ArticulopedidoRepository ArticulopedidoRepository;

    public List<ArticuloPedido> getAll() {
        return ArticulopedidoRepository.findAll();
    }

    public ArticuloPedido getById(Long id) {
        return ArticulopedidoRepository.findById(id).orElse(null);
    }

    public ArticuloPedido create(ArticuloPedido articuloPedido) {
        return ArticulopedidoRepository.save(articuloPedido);
    }

    public ArticuloPedido update(Long id, ArticuloPedido articuloPedido) {
        articuloPedido.setId(id);
        return ArticulopedidoRepository.save(articuloPedido);
    }

    public void delete(Long id) {
        ArticulopedidoRepository.deleteById(id);
    }
}
