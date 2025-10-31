"use client";
import { useState, useEffect } from "react";
import { fetchCategorias, crearCategoria } from "../lib/api";

export default function CategoriaForm() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");

  const cargarCategorias = async () => {
    const data = await fetchCategorias();
    setCategorias(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearCategoria(nombre);
    setNombre("");
    cargarCategorias();
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar Categoría
        </button>
      </form>

      <ul className="divide-y">
        {categorias.map((cat) => (
          <li key={cat.id} className="py-2">
            {cat.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}
