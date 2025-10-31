"use client";
import "../globals.css";
import { useEffect, useState } from "react";
import { fetchCategorias, fetchGastos, crearGasto } from "../lib/api";

interface Gasto {
  id: number;
  descripcion: string;
  monto: number;
  categoria_id: number;
  categoria?: {
    id: number;
    nombre: string;
  };
}

interface Categoria {
  id: number;
  nombre: string;
}

export default function GastosPage() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [editando, setEditando] = useState<Gasto | null>(null);

  // 🔹 URL del backend (Docker o local)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  // 🔹 Cargar datos de backend
  const cargarDatos = async () => {
    try {
      const [cats, gastosData] = await Promise.all([
        fetchCategorias(),
        fetchGastos(),
      ]);
      setCategorias(cats);
      setGastos(gastosData);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // 🔹 Crear o editar gasto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descripcion.trim() || !monto || !categoriaId) return;

    const data = {
      descripcion,
      monto: parseFloat(monto),
      categoria_id: Number(categoriaId),
    };

    try {
      if (editando) {
        // ✅ Editar gasto existente
        const response = await fetch(`${API_URL}/gastos/${editando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("Error al editar gasto:", error);
          alert("No se pudo editar el gasto.");
          return;
        }

        setEditando(null);
      } else {
        // ✅ Crear nuevo gasto
        await crearGasto(data.descripcion, data.monto, data.categoria_id);
      }

      // Limpiar formulario y recargar
      setDescripcion("");
      setMonto("");
      setCategoriaId("");
      await cargarDatos();
    } catch (error) {
      console.error("Error guardando gasto:", error);
    }
  };

  // 🔹 Eliminar gasto
  const eliminarGasto = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este gasto?")) {
      try {
        const response = await fetch(`${API_URL}/gastos/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("Error al eliminar gasto:", error);
          alert("No se pudo eliminar el gasto.");
          return;
        }

        await cargarDatos();
      } catch (error) {
        console.error("Error al eliminar gasto:", error);
      }
    }
  };

  // 🔹 Editar gasto
  const editarGasto = (gasto: Gasto) => {
    setEditando(gasto);
    setDescripcion(gasto.descripcion);
    setMonto(gasto.monto.toString());
    setCategoriaId(gasto.categoria_id?.toString() || "");
  };

  // 🔹 Calcular total
  const total = gastos.reduce((acc, g) => acc + g.monto, 0);

  return (
    <main>
      <div className="container">
        <h1 className="text-center" style={{ color: "var(--color-primary)" }}>
          💰 Registro de Gastos
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
            required
          />
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Monto"
            required
          />
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          >
            <option value="">Categoría</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-green">
            {editando ? "Guardar cambios" : "Agregar"}
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Categoría</th>
              <th style={{ textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map((g) => (
              <tr key={g.id}>
                <td>{g.descripcion}</td>
                <td>${g.monto.toFixed(2)}</td>
                <td>{g.categoria?.nombre || "Sin categoría"}</td>
                <td style={{ textAlign: "right" }}>
                  <button
                    onClick={() => editarGasto(g)}
                    className="btn btn-blue"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarGasto(g.id)}
                    className="btn btn-danger"
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            textAlign: "right",
            marginTop: "1rem",
            fontWeight: "600",
            color: "var(--color-text)",
          }}
        >
          Total: ${total.toFixed(2)}
        </div>
      </div>
    </main>
  );
}
