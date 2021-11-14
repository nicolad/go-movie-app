package db

import (
	"fmt"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" // Used in gorm
)

var instance *gorm.DB

// Init creates connection to postgres server
func Init() {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	dbname := os.Getenv("DB_NAME")
	user := os.Getenv("DB_USERNAME")
	password := os.Getenv("DB_PASSWORD")

	db, err := gorm.Open("postgres", fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname,
	))

	if err != nil {
		panic(err)
	}

	db.LogMode(true)

	instance = db
}

// GetInstance returns db connection instance
func GetInstance() *gorm.DB {
	if instance == nil {
		panic("Database connection has not been created.")
	}
	return instance
}

// Close ends the db connection
func Close() {
	if instance == nil {
		return
	}
	instance.Close()
}
