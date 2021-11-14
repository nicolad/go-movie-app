package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/taisuke-j/apollo-demo/graph/generated"
	"github.com/taisuke-j/apollo-demo/graph/model"
)

func (r *mutationResolver) CreateArticle(ctx context.Context, input model.NewArticle) (*model.Article, error) {
	article := model.Article{
		Title:    input.Title,
		Body:     input.Body,
		AuthorID: input.AuthorID,
	}
	r.DB.Create(&article)

	return &article, nil
}

func (r *mutationResolver) UpdateArticle(ctx context.Context, input model.EditArticle) (*model.Article, error) {
	article := model.Article{ID: input.ID}
	r.DB.First(&article)
	article.Title = input.Title
	article.Body = input.Body
	r.DB.Model(&model.Article{}).Update(&article)

	return &article, nil
}

func (r *mutationResolver) DeleteArticle(ctx context.Context, id int) (*model.Article, error) {
	article := model.Article{
		ID: id,
	}
	r.DB.First(&article)
	r.DB.Delete(&article)
	return &article, nil
}

func (r *mutationResolver) CreateAuthor(ctx context.Context, input model.NewAuthor) (*model.Author, error) {
	arthor := model.Author{
		Name: input.Name,
	}
	r.DB.Create(&arthor)

	return &arthor, nil
}

func (r *mutationResolver) UpdateAuthor(ctx context.Context, input model.EditAuthor) (*model.Author, error) {
	author := model.Author{ID: input.ID}
	r.DB.First(&author)
	author.Name = input.Name
	r.DB.Model(&model.Author{}).Update(&author)

	return &author, nil
}

func (r *mutationResolver) DeleteAuthor(ctx context.Context, id int) (*model.Author, error) {
	author := model.Author{
		ID: id,
	}
	r.DB.First(&author)
	r.DB.Delete(&author)
	return &author, nil
}

func (r *queryResolver) Articles(ctx context.Context) ([]*model.Article, error) {
	articles := []*model.Article{}
	r.DB.Preload("Author").Order("updated_at desc").Find(&articles)
	return articles, nil
}

func (r *queryResolver) Article(ctx context.Context, id int) (*model.Article, error) {
	var article model.Article
	r.DB.Preload("Author").First(&article, id)
	return &article, nil
}

func (r *queryResolver) Authors(ctx context.Context) ([]*model.Author, error) {
	authors := []*model.Author{}
	r.DB.Find(&authors)
	return authors, nil
}

func (r *queryResolver) Author(ctx context.Context, id int) (*model.Author, error) {
	var author model.Author
	r.DB.First(&author, id)
	return &author, nil
}

// Mutation returns generated.MutationResolver implementation
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
