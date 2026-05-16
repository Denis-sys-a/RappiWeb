"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { MapPin, ArrowLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

type Producto = {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagenUrl: string
}

type Restaurante = {
  id: number
  nombre: string
  direccion: string
  imagenUrl: string
  productos: Producto[]
}

export default function RestaurantePage() {
  const { id } = useParams()
  const router = useRouter()
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:8080/restaurantes/${id}`)
      .then((res) => res.json())
      .then((data) => setRestaurante(data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="p-6 flex flex-col gap-4">
      <Skeleton className="h-52 w-full rounded-xl" />
      <Skeleton className="h-6 w-1/3 rounded" />
      <Skeleton className="h-4 w-1/4 rounded" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  )

  if (!restaurante) return (
    <div className="p-6 text-zinc-400">Restaurante no encontrado.</div>
  )

  return (
    <div className="flex flex-col gap-6 p-6 bg-zinc-50 min-h-screen">

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-500 w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> Volver
      </button>

      <div className="relative w-full h-52 rounded-xl overflow-hidden">
        <img
          src={restaurante.imagenUrl || "https://placehold.co/800x300?text=Sin+imagen"}
          alt={restaurante.nombre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-5">
          <h1 className="text-2xl font-bold text-white">{restaurante.nombre}</h1>
          <p className="flex items-center gap-1 text-sm text-white/80 mt-1">
            <MapPin className="w-4 h-4" /> {restaurante.direccion}
          </p>
        </div>
      </div>

      <h2 className="text-lg font-bold">
        Menu ({restaurante.productos?.length ?? 0} productos)
      </h2>

      {!restaurante.productos || restaurante.productos.length === 0 ? (
        <p className="text-zinc-400">Este restaurante aun no tiene productos.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {restaurante.productos.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="w-full h-36 bg-zinc-100 overflow-hidden">
                <img
                  src={p.imagenUrl || "https://placehold.co/300x150?text=Sin+imagen"}
                  alt={p.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex flex-col gap-1">
                <h3 className="font-semibold text-sm truncate">{p.nombre}</h3>
                <p className="text-xs text-zinc-500 truncate">{p.descripcion}</p>
                <p className="text-sm font-bold mt-1" style={{ color: "#FF4940" }}>
                  S/ {p.precio?.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}