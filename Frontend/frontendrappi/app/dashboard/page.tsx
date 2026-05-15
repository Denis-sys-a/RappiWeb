"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import RestauranteCard from "@/components/restaurante-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"

type Restaurante = {
  id: number
  nombre: string
  direccion: string
  imagenUrl: string
}

const categorias = [
  { emoji: "🍣", label: "Sushi" },
  { emoji: "🥗", label: "Saludable" },
  { emoji: "🍕", label: "Pizzas" },
  { emoji: "🍔", label: "Hamburguesas" },
  { emoji: "🍗", label: "Pollos" },
  { emoji: "🌮", label: "Mexicana" },
  { emoji: "🍜", label: "Asiática" },
  { emoji: "🥩", label: "Carnes" },
  { emoji: "🍰", label: "Postres" },
  { emoji: "☕", label: "Café" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState("")

  useEffect(() => {
    const usuario = localStorage.getItem("usuario")
    if (!usuario) router.push("/login")
  }, [])

  useEffect(() => {
    fetch("http://localhost:8080/restaurantes")
      .then((res) => res.json())
      .then((data) => setRestaurantes(data))
      .catch(() => setRestaurantes([]))
      .finally(() => setLoading(false))
  }, [])

  const filtrados = restaurantes.filter((r) =>
    r.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6 p-6 bg-zinc-50 min-h-screen">

      {/* Buscador */}
      <Input
        placeholder="Buscar restaurantes..."
        className="max-w-xl"
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* Categorías */}
      <div className="flex gap-5 overflow-x-auto pb-2">
        {categorias.map((cat) => (
          <button
            key={cat.label}
            className="flex flex-col items-center gap-1 shrink-0 hover:scale-110 transition-transform"
          >
            <div className="w-14 h-14 rounded-full bg-white border flex items-center justify-center text-2xl shadow-sm">
              {cat.emoji}
            </div>
            <span className="text-xs text-zinc-600 font-medium">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Título */}
      <h2 className="text-xl font-bold">
        Restaurantes cerca de ti ({filtrados.length})
      </h2>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/2 rounded" />
            </div>
          ))}
        </div>
      ) : filtrados.length === 0 ? (
        <p className="text-zinc-400 py-10 text-center">No se encontraron restaurantes.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtrados.map((r) => (
            <RestauranteCard
              key={r.id}
              nombre={r.nombre}
              direccion={r.direccion}
              imagenUrl={r.imagenUrl}
              onClick={() => router.push(`/restaurante/${r.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}