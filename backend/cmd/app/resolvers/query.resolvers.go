package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.57

import (
	model "backend/cmd/app/domain/dao"
	"backend/graph"
	"context"
)

// GetUsers is the resolver for the getUsers field.
func (r *queryResolver) GetUsers(ctx context.Context) ([]*model.User, error) {
	users, err := r.DB.GetUsers()
	if err != nil {
		return nil, err
	}
	return users, nil
}

// GetUser is the resolver for the getUser field.
func (r *queryResolver) GetUser(ctx context.Context, id string) (*model.User, error) {
	user, err := r.DB.GetUser(id)
	if err != nil {
		return nil, err
	}
	return user, nil
}

// GetProducts is the resolver for the getProducts field.
func (r *queryResolver) GetProducts(ctx context.Context) ([]*model.Product, error) {
	products, err := r.DB.GetProducts()
	if err != nil {
		return nil, err
	}
	return products, nil
}

// GetProduct is the resolver for the getProduct field.
func (r *queryResolver) GetProduct(ctx context.Context, id string) (*model.Product, error) {
	product, err := r.DB.GetProduct(id)
	if err != nil {
		return nil, err
	}
	return product, nil
}

// Query returns graph.QueryResolver implementation.
func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
