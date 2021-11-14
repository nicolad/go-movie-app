package main

import (
	"fmt"

	connection "github.com/nicolad/go-movie-app/db"
	"github.com/nicolad/go-movie-app/graph/model"
)

func main() {
	connection.Init()
	db := connection.GetInstance()
	defer connection.Close()

	// db.Create(&model.User{
	// 	ID: "1",
	// 	Name: "Tom",
	// })

	db.Create(&model.User{
		ID: "2",
		Name: "Bob",
	})
	fmt.Print("\r\n✨ Seed data has been added.\r\n")
}
