package config

import (
	model "backend/cmd/app/domain"
	model1 "backend/cmd/app/domain/dao"
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DB struct {
	client *mongo.Client
}

func ConnectDB() *DB {
	client, err := mongo.NewClient(options.Client().ApplyURI(EnvMongoURI()))
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	//ping the database
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB")
	return &DB{client: client}
}

func colHelper(db *DB, collectionName string) *mongo.Collection {
	return db.client.Database("testdb").Collection(collectionName)
}

func (db *DB) CreateUser(input *model.NewUser) (*model1.User, error) {
	collection := colHelper(db, "users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	res, err := collection.InsertOne(ctx, input)

	if err != nil {
		return nil, err
	}

	user := &model1.User{
		ID:    res.InsertedID.(primitive.ObjectID).Hex(),
		Name:  input.Name,
		Email: input.Email,
	}

	return user, err
}

func (db *DB) CreatePost(input *model.NewPost) (*model1.Post, error) {
	collection := colHelper(db, "posts")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	res, err := collection.InsertOne(ctx, input)

	if err != nil {
		return nil, err
	}

	post := &model1.Post{
		ID:          res.InsertedID.(primitive.ObjectID).Hex(),
		Title:       input.Title,
		Description: input.Description,
	}

	return post, err
}

func (db *DB) GetUsers() ([]*model1.User, error) {
	collection := colHelper(db, "users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Gunakan bson.M{} untuk mengambil semua dokumen
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx) // Pastikan cursor ditutup

	var users []*model1.User
	for cursor.Next(ctx) {
		var user model1.User
		// Decode setiap dokumen ke dalam struct
		if err := cursor.Decode(&user); err != nil {
			return nil, fmt.Errorf("error decoding user: %v", err)
		}
		users = append(users, &user)
	}

	// Periksa apakah ada error saat iterasi
	if err := cursor.Err(); err != nil {
		return nil, fmt.Errorf("error iterating cursor: %v", err)
	}

	return users, nil
}

func (db *DB) GetPosts() ([]*model1.Post, error) {
	collection := colHelper(db, "posts")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Gunakan bson.M{} untuk mengambil semua dokumen
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx) // Pastikan cursor ditutup

	var posts []*model1.Post
	for cursor.Next(ctx) {
		var post model1.Post
		// Decode setiap dokumen ke dalam struct
		if err := cursor.Decode(&post); err != nil {
			return nil, fmt.Errorf("error decoding post: %v", err)
		}
		posts = append(posts, &post)
	}

	// Periksa apakah ada error saat iterasi
	if err := cursor.Err(); err != nil {
		return nil, fmt.Errorf("error iterating cursor: %v", err)
	}

	return posts, nil
}
