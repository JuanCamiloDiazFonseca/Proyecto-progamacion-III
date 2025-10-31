package main

import (
	"backend/database"
	"backend/models"
	"backend/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"time"
)

func main() {
	r := gin.Default()

	// ✅ Configuración de CORS (permite peticiones del frontend Docker)
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Cambia "*" por tu dominio si deseas más seguridad
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// ✅ Conexión a la base de datos
	database.Connect()

	// ⚠️ Recomendado: AutoMigrate debe hacerse en orden (primero Categoría, luego Gasto)
	err := database.DB.AutoMigrate(&models.Categoria{}, &models.Gasto{})
	if err != nil {
		log.Fatalf("Error en migración de base de datos: %v", err)
	}

	// ✅ Ruta de prueba
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "🚀 API de Finanzas funcionando correctamente"})
	})

	// ✅ Rutas de categorías
	r.GET("/categorias", routes.GetCategorias)
	r.POST("/categorias", routes.CreateCategoria)
	r.PUT("/categorias/:id", routes.UpdateCategoria)
	r.DELETE("/categorias/:id", routes.DeleteCategoria)

	// ✅ Rutas de gastos
	r.GET("/gastos", routes.GetGastos)
	r.POST("/gastos", routes.CreateGasto)
	r.PUT("/gastos/:id", routes.UpdateGasto)
	r.DELETE("/gastos/:id", routes.DeleteGasto)

	// ✅ Iniciar servidor
	r.Run(":8080")
}
