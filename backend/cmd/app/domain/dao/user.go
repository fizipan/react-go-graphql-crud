package model

type User struct {
	ID    string `json:"_id" bson:"_id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}
