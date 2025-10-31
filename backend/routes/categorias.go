package routes

import (
	"backend/database"
	"backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

// ✅ Obtener todas las categorías
func GetCategorias(c *gin.Context) {
	var categorias []models.Categoria
	database.DB.Find(&categorias)
	c.JSON(http.StatusOK, categorias)
}

// ✅ Crear una nueva categoría
func CreateCategoria(c *gin.Context) {
	var categoria models.Categoria
	if err := c.ShouldBindJSON(&categoria); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&categoria)
	c.JSON(http.StatusCreated, categoria)
}

// ✅ Actualizar una categoría existente
func UpdateCategoria(c *gin.Context) {
	id := c.Param("id")
	var categoria models.Categoria

	if err := database.DB.First(&categoria, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Categoría no encontrada"})
		return
	}

	if err := c.ShouldBindJSON(&categoria); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Save(&categoria)
	c.JSON(http.StatusOK, categoria)
}

// ✅ Eliminar una categoría
func DeleteCategoria(c *gin.Context) {
	id := c.Param("id")

	if err := database.DB.Delete(&models.Categoria{}, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No se pudo eliminar la categoría"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Categoría eliminada correctamente"})
}
