package com.rappi.BackendRappi.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "ordenes")
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fecha;
    private Double total;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonIgnoreProperties({ "email", "password" })
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "restaurante_id")
    @JsonIgnoreProperties({ "direccion", "imagenUrl", "productos" })
    private Restaurante restaurante;

    @OneToMany(mappedBy = "orden", cascade = CascadeType.ALL)
    private List<ArticuloPedido> articulos;

    public Orden() {
    }

    public Orden(LocalDateTime fecha, Double total, Usuario usuario, Restaurante restaurante) {
        this.fecha = fecha;
        this.total = total;
        this.usuario = usuario;
        this.restaurante = restaurante;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Restaurante getRestaurante() {
        return restaurante;
    }

    public void setRestaurante(Restaurante restaurante) {
        this.restaurante = restaurante;
    }

    public List<ArticuloPedido> getArticulos() {
        return articulos;
    }

    public void setArticulos(List<ArticuloPedido> articulos) {
        this.articulos = articulos;
    }
}
