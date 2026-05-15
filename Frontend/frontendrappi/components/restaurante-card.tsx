type Props = {
  nombre: string
  direccion: string
  imagenUrl: string
  onClick?: () => void
}

// Tiempo de entrega aleatorio entre 20-70 min para simular datos reales
function tiempoAleatorio() {
  const min = Math.floor(Math.random() * 30) + 20
  return `${min} - ${min + 15} min`
}

const badges = ["Envío Gratis", "Hasta 30% Off", "Hasta 33% Off", "Nuevos", null, null]

export default function RestauranteCard({ nombre, direccion, imagenUrl, onClick }: Props) {
  const badge = badges[Math.floor(Math.random() * badges.length)]
  const tiempo = tiempoAleatorio()

  return (
    <div
      onClick={onClick}
      className="rounded-xl overflow-hidden border bg-white hover:shadow-lg transition-all cursor-pointer group"
    >
      {/* Imagen */}
      <div className="relative w-full h-40 bg-zinc-100 overflow-hidden">
        <img
          src={imagenUrl || "https://placehold.co/400x200?text=Sin+imagen"}
          alt={nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badge */}
        {badge && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="font-semibold text-sm truncate">{nombre}</h3>
        <p className="text-xs text-zinc-500 truncate">{direccion}</p>
        <p className="text-xs text-zinc-400">🕐 {tiempo}</p>
      </div>
    </div>
  )
}