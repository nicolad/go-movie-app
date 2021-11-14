package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/rs/cors"
	"github.com/taisuke-j/apollo-demo/db"
	"github.com/taisuke-j/apollo-demo/graph"
	"github.com/taisuke-j/apollo-demo/graph/generated"
)

const defaultPort = "8080"

func main() {
	db.Init()
	defer db.Close()

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	router := chi.NewRouter()
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:4000"},
		AllowCredentials: true,
		Debug:            true,
	}).Handler)

	server := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{DB: db.GetInstance()}}))

	router.Handle("/", playground.Handler("GraphQL playground", "/graphql"))
	router.Handle("/graphql", server)

	log.Printf("🚀 GraphQL playground ready at http://localhost:%s/", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
