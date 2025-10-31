const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function fetchCategorias() {
  const res = await fetch(`${API_URL}/categorias`);
  return res.json();
}

export async function crearCategoria(nombre: string) {
  const res = await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  });
  return res.json();
}

export async function fetchGastos() {
  const res = await fetch(`${API_URL}/gastos`);
  return res.json();
}

export async function crearGasto(descripcion: string, monto: number, categoria_id: number) {
  const res = await fetch(`${API_URL}/gastos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descripcion, monto, categoria_id }),
  });
  return res.json();
}
