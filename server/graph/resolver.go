package graph

import "github.com/jinzhu/gorm"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

// Resolver has access to db connection
type Resolver struct {
	DB *gorm.DB
}