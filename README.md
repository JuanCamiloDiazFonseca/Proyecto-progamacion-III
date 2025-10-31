💸 Aplicación de Control de Gastos — Programación III
📘 Descripción del Proyecto

Este proyecto es una aplicación web de control de gastos personales desarrollada como parte del curso Programación III.
Permite registrar, editar y eliminar categorías y gastos, gestionando la información desde una API REST creada en Go (Golang) y visualizándola mediante un frontend moderno en Next.js con estilos CSS personalizados.
El sistema está completamente contenedorizado con Docker para simplificar su despliegue y ejecución.

👤 Información General

Integrante: Juan Camilo Díaz Fonseca

Grupo: 8

Materia: Programación III

Facultad: Ingeniería de Software

Institución: Corporación Universitaria del Huila – CORHUILA

⚙️ Tecnologías Utilizadas
Componente	Tecnología
Backend	Go (Golang) con framework Gin
Frontend	Next.js + React + TypeScript
Base de datos	PostgreSQL
Contenedores	Docker & Docker Compose
ORM	GORM
Estilos	CSS y Tailwind CSS
API	RESTful con JSON
🧱 Estructura del Proyecto
finanzas-app/
│
├── backend/                # API REST con Go (Golang)
│   ├── main.go
│   ├── models/
│   ├── routes/
│   ├── database/
│   └── go.mod
│
├── frontend/               # Aplicación web con Next.js
│   ├── app/
│   │   ├── gastos/
│   │   ├── categorias/
│   │   ├── globals.css
│   │   └── page.tsx
│   ├── lib/
│   └── public/
│
├── docker-compose.yml      # Orquestación de los contenedores
└── README.md

🐳 Despliegue con Docker

1️⃣ Clonar el repositorio

git clone https://github.com/JuanCamiloDiazFonseca/Proyecto-progamacion-III.git
cd Proyecto-progamacion-III


2️⃣ Levantar los contenedores

docker compose up --build


3️⃣ Acceder a la aplicación

Frontend: http://localhost:3000

Backend API: http://localhost:8080

4️⃣ Detener los contenedores

docker compose down

💾 Endpoints principales del Backend
Método	Ruta	Descripción
GET	/categorias	Obtener todas las categorías
POST	/categorias	Crear una nueva categoría
PUT	/categorias/:id	Actualizar una categoría
DELETE	/categorias/:id	Eliminar una categoría
GET	/gastos	Obtener todos los gastos
POST	/gastos	Crear un nuevo gasto
PUT	/gastos/:id	Editar un gasto existente
DELETE	/gastos/:id	Eliminar un gasto
🧠 Funcionalidades Principales

✅ Registro, edición y eliminación de categorías.
✅ Registro, edición y eliminación de gastos.
✅ Cálculo automático del total de gastos.
✅ Diseño responsive con CSS personalizado.
✅ Integración completa con API REST en Go.
✅ Despliegue completo mediante Docker Compose.

📸 Ejemplo visual del sistema

(Agrega capturas de pantalla aquí si lo deseas, por ejemplo de la pantalla principal y de los formularios.)

🧩 Posibles Mejoras Futuras

Autenticación con JWT para usuarios.

Reportes gráficos de gastos mensuales.

Exportación a Excel o PDF.

Dashboard analítico con filtros por fecha.

👨‍💻 Autor

Juan Camilo Díaz Fonseca
Estudiante de Ingeniería de Software
Corporación Universitaria del Huila – CORHUILA
