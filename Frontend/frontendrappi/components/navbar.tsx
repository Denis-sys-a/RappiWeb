"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, MapPin, User } from "lucide-react"

type Props = {
  onBusqueda?: (valor: string) => void
}

export default function Navbar({ onBusqueda }: Props) {
  const router = useRouter()

  function handleLogout() {
    localStorage.removeItem("usuario")
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-4">

        {/* Logo */}
        <span className="text-2xl font-extrabold text-orange-500 tracking-tight shrink-0">
          Rappi
        </span>

        {/* Ubicación */}
        <button className="flex items-center gap-1 text-sm text-zinc-600 hover:text-orange-500 shrink-0">
          <MapPin className="w-4 h-4 text-orange-500" />
          Lima
        </button>

        {/* Buscador */}
        <div className="flex-1">
          <Input
            placeholder="Buscar en Rappi..."
            onChange={(e) => onBusqueda?.(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Íconos derecha */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-zinc-600 hover:text-orange-500"
          >
            <User className="w-5 h-5" />
            Ingreso
          </button>
          <button className="relative text-zinc-600 hover:text-orange-500">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  )
}