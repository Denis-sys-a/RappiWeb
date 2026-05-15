"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useRouter, usePathname } from "next/navigation"
import { UtensilsCrossed, ShoppingBasket, Pill, Zap, LogOut } from "lucide-react"

const secciones = [
  { label: "Restaurantes", icon: UtensilsCrossed, href: "/dashboard" },
  { label: "Supermercados", icon: ShoppingBasket, href: "/supermercados" },
  { label: "Farmacia", icon: Pill, href: "/farmacia" },
  { label: "Express", icon: Zap, href: "/express" },
]

export function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  function handleLogout() {
    localStorage.removeItem("usuario")
    router.push("/login")
  }

  return (
    <Sidebar>
      {/* Logo */}
      <SidebarHeader className="px-4 py-4">
        <span className="text-2xl font-extrabold text-orange-500">Rappi</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Secciones</SidebarGroupLabel>
          <SidebarMenu>
            {secciones.map((s) => (
              <SidebarMenuItem key={s.label}>
                <SidebarMenuButton
                  isActive={pathname === s.href}
                  onClick={() => router.push(s.href)}
                >
                  <s.icon className="w-4 h-4" />
                  <span>{s.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer con cerrar sesión */}
      <SidebarFooter className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}