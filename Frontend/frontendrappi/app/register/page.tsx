"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const router = useRouter()
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [exito, setExito] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleRegistro() {
    setLoading(true)
    setError("")
    setExito("")
    if (!nombre || !email || !password) {
      setError("Completa todos los campos.")
      setLoading(false)
      return
    }
    try {
      const res = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      })
      const data = await res.json()
      if (!data || !data.id) {
        setError("No se pudo crear la cuenta.")
        return
      }
      setExito("¡Cuenta creada! Redirigiendo...")
      setTimeout(() => router.push("/login"), 1500)
    } catch {
      setError("No se pudo conectar con el servidor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Lado izquierdo */}
      <div
        className="hidden lg:flex flex-col items-center justify-center p-12 text-white"
        style={{ backgroundColor: "#FF4940" }}
      >
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Rappi</h1>
        <p className="text-2xl font-bold text-center leading-tight">
          ¡30 DÍAS DE ENVÍOS <br /> GRATIS!
        </p>
        <p className="mt-3 text-base text-white/80 text-center">
          Regístrate y disfruta de envíos gratis <br /> en tus primeros pedidos
        </p>
      </div>

      {/* Lado derecho */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm flex flex-col gap-6">

          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl font-extrabold" style={{ color: "#FF4940" }}>
              Rappi
            </span>
            <h2 className="text-xl font-bold text-zinc-800 mt-2">Crea tu cuenta</h2>
            <p className="text-sm text-zinc-500">Completa tus datos para registrarte</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {exito && <p className="text-sm text-green-500">{exito}</p>}

            <Button
              onClick={handleRegistro}
              disabled={loading}
              className="w-full"
              style={{ backgroundColor: "#FF4940" }}
            >
              {loading ? "Registrando..." : "Crear cuenta"}
            </Button>

            <p className="text-sm text-center text-zinc-500">
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => router.push("/login")}
                className="font-semibold hover:underline"
                style={{ color: "#FF4940" }}
              >
                Inicia sesión
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}