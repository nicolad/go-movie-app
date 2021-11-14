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

	db.Create(&model.Author{
		Name: "Tom",
	})
	db.Create(&model.Article{
		Title:    "Article 1",
		Body:     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		AuthorID: 1,
	})
	db.Create(&model.Article{
		Title:    "Article 2",
		Body:     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		AuthorID: 1,
	})
	db.Create(&model.Article{
		Title:    "Article 3",
		Body:     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		AuthorID: 1,
	})

	fmt.Print("\r\n✨ Seed data has been added.\r\n")
}
