package models

type Gasto struct {
	ID          uint       `json:"id" gorm:"primaryKey"`
	Descripcion string     `json:"descripcion"`
	Monto       float64    `json:"monto"`
	CategoriaID uint       `json:"categoria_id"`
	Categoria   Categoria  `json:"categoria" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:CategoriaID"`
}
