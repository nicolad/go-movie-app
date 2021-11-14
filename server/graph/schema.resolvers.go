package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/nicolad/go-movie-app/graph/generated"
	"github.com/nicolad/go-movie-app/graph/model"
)

func (r *mutationResolver) Like(ctx context.Context, userID string, movieID string) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	var user model.User
	r.DB.Preload("User").First(&user, id)
	return &user, nil
}

func (r *queryResolver) Movies(ctx context.Context, search string) ([]*model.Movie, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
