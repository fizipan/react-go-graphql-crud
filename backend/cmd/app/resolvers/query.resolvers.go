package resolvers

import (
	model "backend/cmd/app/domain/dao"
	"backend/graph"
	"context"
)

// Posts adalah resolver untuk field posts
func (r *queryResolver) Posts(ctx context.Context) ([]*model.Post, error) {
	posts, err := r.DB.GetPosts()
	if err != nil {
		return nil, err
	}
	return posts, nil
}

// Users adalah resolver untuk field users
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	users, err := r.DB.GetUsers()
	if err != nil {
		return nil, err
	}
	return users, nil
}

// Query mengembalikan implementasi dari graph.QueryResolver
func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
