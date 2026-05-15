"use client"

import { ShoppingCart, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"

export default function Topbar() {
  const router = useRouter()
  const [usuario, setUsuario] = useState<{ nombre: string } | null>(null)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const data = localStorage.getItem("usuario")
    if (data) setUsuario(JSON.parse(data))
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuAbierto(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const inicial = usuario?.nombre?.charAt(0).toUpperCase() ?? "U"

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b bg-white">
      <div className="flex items-center gap-3 ml-auto">
        <button className="p-2 text-zinc-600 hover:text-orange-500">
          <ShoppingCart className="w-5 h-5" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center hover:opacity-80"
            style={{ backgroundColor: "#FF4940" }}
          >
            {inicial}
          </button>

          {menuAbierto && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b">
                <p className="text-xs text-zinc-400">Hola,</p>
                <p className="text-sm font-semibold truncate">{usuario?.nombre}</p>
              </div>
                <button
                  onClick={() => setMenuAbierto(false)}
                  className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                >
                  <User className="w-4 h-4" /> Mi cuenta
                </button>
              <div className="border-t" />
              <button
                onClick={() => { localStorage.removeItem("usuario"); router.push("/login") }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}