"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../globals.css";

export default function Navbar() {
  const path = usePathname();

  return (
    <nav
      style={{
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h2 style={{ color: "var(--color-primary)", fontWeight: 700 }}>
        💸 Finanzas App
      </h2>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link
          href="/"
          className={`nav-link ${path === "/" ? "active" : ""}`}
        >
          Inicio
        </Link>
        <Link
          href="/categorias"
          className={`nav-link ${path === "/categorias" ? "active" : ""}`}
        >
          Categorías
        </Link>
        <Link
          href="/gastos"
          className={`nav-link ${path === "/gastos" ? "active" : ""}`}
        >
          Gastos
        </Link>
      </div>
    </nav>
  );
}
