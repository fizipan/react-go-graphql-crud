//go:build tools
// +build tools

package tools

import (
	_ "github.com/99designs/gqlgen"
	_ "github.com/gin-gonic/gin"
	_ "github.com/joho/godotenv"
	_ "go.mongodb.org/mongo-driver/mongo"
	_ "github.com/golang-jwt/jwt/v5"
	_ "github.com/rs/cors"
)
