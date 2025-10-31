"use client";
import { useState, useEffect } from "react";
import { fetchCategorias, fetchGastos, crearGasto } from "../lib/api";

export default function GastoForm() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [gastos, setGastos] = useState<any[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const cargarDatos = async () => {
    setCategorias(await fetchCategorias());
    setGastos(await fetchGastos());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearGasto(descripcion, parseFloat(monto), parseInt(categoriaId));
    setDescripcion("");
    setMonto("");
    cargarDatos();
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Registrar Gasto
        </button>
      </form>

      <ul className="divide-y">
        {gastos.map((g) => (
          <li key={g.id} className="py-2">
            {g.descripcion} — ${g.monto} ({g.categoria?.nombre})
          </li>
        ))}
      </ul>
    </div>
  );
}
