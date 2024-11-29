package resolvers

import (
	model "backend/cmd/app/domain"
	model1 "backend/cmd/app/domain/dao"
	"backend/graph"
	"context"
)

// CreatePost adalah resolver untuk field createPost
func (r *mutationResolver) CreatePost(ctx context.Context, input model.NewPost) (*model1.Post, error) {
	post, err := r.DB.CreatePost(&input)
	if err != nil {
		return nil, err
	}
	return post, nil
}

// CreateUser adalah resolver untuk field createUser
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model1.User, error) {
	user, err := r.DB.CreateUser(&input)
	if err != nil {
		return nil, err
	}
	return user, nil
}

// Mutation mengembalikan implementasi dari graph.MutationResolver
func (r *Resolver) Mutation() graph.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
