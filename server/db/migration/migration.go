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

	db.AutoMigrate(&model.User{})

	fmt.Print("\r\n✨ Migration completed.\r\n")
}
