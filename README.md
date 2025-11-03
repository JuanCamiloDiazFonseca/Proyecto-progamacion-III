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

🐳 Despliegue con Docker

1️:Clonar el repositorio

git clone https://github.com/JuanCamiloDiazFonseca/Proyecto-progamacion-III.git
cd Proyecto-progamacion-III


2️:Levantar los contenedores

docker compose up --build


3️:Acceder a la aplicación

Frontend: http://localhost:3000

Backend API: http://localhost:8080

4:Detener los contenedores

docker compose down

Funcionalidades Principales

✅ Registro, edición y eliminación de categorías.
✅ Registro, edición y eliminación de gastos.
✅ Cálculo automático del total de gastos.
✅ Diseño responsive con CSS personalizado.
✅ Integración completa con API REST en Go.
✅ Despliegue completo mediante Docker Compose.

👨‍💻 Autor

Juan Camilo Díaz Fonseca
Estudiante de Ingeniería de Software
Corporación Universitaria del Huila – CORHUILA
