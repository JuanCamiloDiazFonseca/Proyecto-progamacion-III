"use client";
import { useEffect, useState } from "react";
import { fetchCategorias, crearCategoria } from "../lib/api";

interface Categoria {
  id: number;
  nombre: string;
}

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nombre, setNombre] = useState("");
  const [editando, setEditando] = useState<Categoria | null>(null);

  // 🔹 URL del backend (Docker o local)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  // 🔹 Cargar categorías
  const obtenerCategorias = async () => {
    try {
      const data = await fetchCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  // 🔹 Crear o editar categoría
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    try {
      if (editando) {
        // ✅ Editar categoría existente
        const response = await fetch(`${API_URL}/categorias/${editando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("Error al editar categoría:", error);
          alert("No se pudo editar la categoría.");
          return;
        }

        setEditando(null);
      } else {
        // ✅ Crear nueva categoría
        await crearCategoria(nombre);
      }

      setNombre("");
      await obtenerCategorias();
    } catch (error) {
      console.error("Error guardando categoría:", error);
    }
  };

  // 🔹 Eliminar categoría
  const eliminarCategoria = async (id: number) => {
    if (confirm("¿Seguro que quieres eliminar esta categoría?")) {
      try {
        const response = await fetch(`${API_URL}/categorias/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("Error al eliminar categoría:", error);
          alert("No se pudo eliminar la categoría.");
          return;
        }

        await obtenerCategorias();
      } catch (error) {
        console.error("Error al eliminar categoría:", error);
      }
    }
  };

  // 🔹 Cargar datos en modo edición
  const editarCategoria = (cat: Categoria) => {
    setEditando(cat);
    setNombre(cat.nombre);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          📂 Categorías
        </h1>

        {/* 🔹 Formulario */}
        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la categoría..."
            className="flex-1 border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {editando ? "Guardar cambios" : "Agregar"}
          </button>
        </form>

        {/* 🔹 Listado de categorías */}
        <ul className="divide-y divide-gray-200">
          {categorias.length === 0 ? (
            <li className="text-center text-gray-500 py-4">
              No hay categorías registradas.
            </li>
          ) : (
            categorias.map((cat) => (
              <li
                key={cat.id}
                className="flex justify-between items-center py-2 px-2 hover:bg-gray-50 transition"
              >
                <span>{cat.nombre}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => editarCategoria(cat)}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarCategoria(cat.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
