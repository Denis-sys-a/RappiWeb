package com.rappi.BackendRappi.controllers;
import com.rappi.BackendRappi.models.ArticuloPedido;
import com.rappi.BackendRappi.repositories.ArticulopedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articulos-pedido")
@CrossOrigin(origins = "*")
public class ArticulopedidoController {

    @Autowired
    private ArticulopedidoRepository ArticulopedidoRepository;

    @GetMapping
    public List<ArticuloPedido> getAll() {
        return ArticulopedidoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ArticuloPedido getById(@PathVariable Long id) {
        return ArticulopedidoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public ArticuloPedido create(@RequestBody ArticuloPedido articuloPedido) {
        return ArticulopedidoRepository.save(articuloPedido);
    }

    @PutMapping("/{id}")
    public ArticuloPedido update(@PathVariable Long id, @RequestBody ArticuloPedido articuloPedido) {
        articuloPedido.setId(id);
        return ArticulopedidoRepository.save(articuloPedido);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        ArticulopedidoRepository.deleteById(id);
    }
    
}
