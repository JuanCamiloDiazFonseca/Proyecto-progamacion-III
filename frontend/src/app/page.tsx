import Link from "next/link";
import "../app/globals.css";

export default function Home() {
  return (
    <main>
      <header>
        <h1>💸 Finanzas Personales</h1>
      </header>

      <div className="container" style={{ marginTop: "2rem" }}>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {/* Panel izquierdo */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <p className="text-gray">
              Administra tus categorías y gastos de forma sencilla y rápida.
            </p>

            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Link href="/categorias" className="btn btn-primary text-center">
                📂 Gestionar Categorías
              </Link>
              <Link href="/gastos" className="btn btn-green text-center">
                💰 Registrar Gastos
              </Link>
            </div>

            <footer>© {new Date().getFullYear()} Desarrollado con ❤️ y Next.js</footer>
          </div>

          {/* Panel derecho */}
          <div
            style={{
              flex: 1,
              minWidth: "300px",
              background: "#eef2ff",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ color: "var(--color-primary)" }}>Sobre el proyecto</h2>
            <p>
              Esta aplicación te permite llevar un control detallado de tus
              gastos personales. Puedes crear categorías para organizar tus
              finanzas y registrar tus movimientos diarios de manera intuitiva,
              visual y segura.
            </p>
            <p className="text-gray" style={{ marginTop: "1rem" }}>
              Desarrollado con Go (backend), Next.js + CSS (frontend),
              contenerizado con Docker y con base de datos PostgreSQL.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
