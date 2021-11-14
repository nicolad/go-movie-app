package main

import (
	"fmt"

	connection "github.com/taisuke-j/apollo-demo/db"
	"github.com/taisuke-j/apollo-demo/graph/model"
)

func main() {
	connection.Init()
	db := connection.GetInstance()
	defer connection.Close()

	db.AutoMigrate(&model.Author{}, &model.Article{})

	fmt.Print("\r\n✨ Migration completed.\r\n")
}
