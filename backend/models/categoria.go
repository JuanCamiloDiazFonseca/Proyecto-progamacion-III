package models

type Categoria struct {
	ID     uint   `gorm:"primaryKey" json:"id"`
	Nombre string `json:"nombre"`
	Icono  string `json:"icono"`
	
}
