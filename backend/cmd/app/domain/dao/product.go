package model

type Product struct {
	ID    string  `json:"_id" bson:"_id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
	Stock int     `json:"stock"`
}
