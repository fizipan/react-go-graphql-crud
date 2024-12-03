package main

import (
	"backend/cmd/app/resolvers"
	"backend/config"
	"backend/graph"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rs/cors"
)

const defaultPort = "8080"

func main() {
	// Port
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Inisialisasi database
	db := config.ConnectDB()

	// Inisialisasi resolver dengan dependency database
	resolver := &resolvers.Resolver{
		DB: db,
	}

	// Inisialisasi server GraphQL 
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))

	// Middleware CORS
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	// Rute
	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", corsMiddleware.Handler(config.AuthMiddleware(srv)))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
