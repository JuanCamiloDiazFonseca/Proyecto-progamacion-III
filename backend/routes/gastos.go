package routes

import (
    "backend/database"
    "backend/models"
    "github.com/gin-gonic/gin"
    "net/http"
)

// ✅ Obtener todos los gastos (con la categoría asociada)
func GetGastos(c *gin.Context) {
    var gastos []models.Gasto

    // Preload carga automáticamente la relación con Categoria
    if err := database.DB.Preload("Categoria").Find(&gastos).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener los gastos"})
        return
    }

    c.JSON(http.StatusOK, gastos)
}

// ✅ Crear un nuevo gasto
func CreateGasto(c *gin.Context) {
    var gasto models.Gasto
    if err := c.ShouldBindJSON(&gasto); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
        return
    }

    if err := database.DB.Create(&gasto).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al crear el gasto"})
        return
    }

    // Traemos la categoría asociada
    database.DB.Preload("Categoria").First(&gasto, gasto.ID)

    c.JSON(http.StatusCreated, gasto)
}

// ✅ Actualizar un gasto existente
func UpdateGasto(c *gin.Context) {
    id := c.Param("id")
    var gasto models.Gasto

    // Verificar si existe
    if err := database.DB.First(&gasto, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Gasto no encontrado"})
        return
    }

    // Recibir los datos nuevos
    var input models.Gasto
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
        return
    }

    gasto.Descripcion = input.Descripcion
    gasto.Monto = input.Monto
    gasto.CategoriaID = input.CategoriaID

    if err := database.DB.Save(&gasto).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar el gasto"})
        return
    }

    // Recargamos con la categoría asociada
    database.DB.Preload("Categoria").First(&gasto, gasto.ID)

    c.JSON(http.StatusOK, gasto)
}

// ✅ Eliminar un gasto
func DeleteGasto(c *gin.Context) {
    id := c.Param("id")

    var gasto models.Gasto
    if err := database.DB.First(&gasto, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Gasto no encontrado"})
        return
    }

    if err := database.DB.Delete(&gasto).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al eliminar el gasto"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Gasto eliminado correctamente"})
}
