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
	"golang.org/x/crypto/bcrypt"
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

	// hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	input.Password = string(hashedPassword)

	res, err := collection.InsertOne(ctx, input)

	if err != nil {
		return nil, err
	}

	user := &model1.User{
		ID:       res.InsertedID.(primitive.ObjectID).Hex(),
		Name:     input.Name,
		Email:    input.Email,
		Password: input.Password,
	}

	return user, err
}

// update user
func (db *DB) UpdateUser(id string, input *model.NewUser) (*model1.User, error) {
	collection := colHelper(db, "users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Konversi string ID ke ObjectID
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid user ID: %v", err)
	}

	// Periksa apakah user ada
	var existingUser model1.User
	err = collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&existingUser)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("user with ID %s not found", id)
		}
		return nil, fmt.Errorf("error checking user existence: %v", err)
	}

	// Periksa apakah ada perubahan password
	if input.Password != "" {
		// hash password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
		if err != nil {
			return nil, err
		}

		input.Password = string(hashedPassword)
	} else {
		input.Password = existingUser.Password
	}

	// Lakukan operasi update
	update := bson.M{
		"$set": bson.M{
			"name":     input.Name,
			"email":    input.Email,
			"password": input.Password,
		},
	}

	_, err = collection.UpdateOne(ctx, bson.M{"_id": objID}, update)
	if err != nil {
		return nil, fmt.Errorf("failed to update user: %v", err)
	}

	// Kembalikan data user yang diperbarui
	updatedUser := &model1.User{
		ID:       id,
		Name:     input.Name,
		Email:    input.Email,
		Password: input.Password,
	}
	return updatedUser, nil
}

// delete user
func (db *DB) DeleteUser(id string) (*model1.User, error) {
	collection := colHelper(db, "users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Konversi ID ke ObjectID
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	// Temukan user sebelum menghapusnya
	var user model1.User
	err = collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&user)
	if err != nil {
		return nil, fmt.Errorf("user not found: %v", err)
	}

	// Hapus user
	_, err = collection.DeleteOne(ctx, bson.M{"_id": objID})
	if err != nil {
		return nil, fmt.Errorf("failed to delete user: %v", err)
	}

	// Kembalikan user yang dihapus
	return &user, nil
}

// create product
func (db *DB) CreateProduct(input *model.NewProduct) (*model1.Product, error) {
	collection := colHelper(db, "products")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	res, err := collection.InsertOne(ctx, input)

	if err != nil {
		return nil, err
	}

	product := &model1.Product{
		ID:    res.InsertedID.(primitive.ObjectID).Hex(),
		Name:  input.Name,
		Price: input.Price,
	}

	return product, err
}

// update product
func (db *DB) UpdateProduct(id string, input *model.NewProduct) (*model1.Product, error) {
	collection := colHelper(db, "products")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Konversi ID ke ObjectID
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid product ID: %v", err)
	}

	// Periksa apakah produk ada
	var existingProduct model1.Product
	err = collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&existingProduct)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("product with ID %s not found", id)
		}
		return nil, fmt.Errorf("error checking product existence: %v", err)
	}

	// Lakukan operasi pembaruan
	update := bson.M{
		"$set": bson.M{
			"name":  input.Name,
			"price": input.Price,
		},
	}

	_, err = collection.UpdateOne(ctx, bson.M{"_id": objID}, update)
	if err != nil {
		return nil, fmt.Errorf("failed to update product: %v", err)
	}

	// Kembalikan data produk yang diperbarui
	updatedProduct := &model1.Product{
		ID:    id,
		Name:  input.Name,
		Price: input.Price,
	}
	return updatedProduct, nil
}

// delete product
func (db *DB) DeleteProduct(id string) (*model1.Product, error) {
	collection := colHelper(db, "products")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Konversi ID ke ObjectID
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	// Temukan product sebelum menghapusnya
	var product model1.Product
	err = collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&product)
	if err != nil {
		return nil, fmt.Errorf("product not found: %v", err)
	}

	// Hapus product
	_, err = collection.DeleteOne(ctx, bson.M{"_id": objID})
	if err != nil {
		return nil, fmt.Errorf("failed to delete product: %v", err)
	}

	// Kembalikan product yang dihapus
	return &product, nil
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

func (db *DB) GetUser(id string) (*model1.User, error) {
	collection := colHelper(db, "users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var user model1.User
	err = collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (db *DB) GetProducts() ([]*model1.Product, error) {
	collection := colHelper(db, "products")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var products []*model1.Product
	for cursor.Next(ctx) {
		var product model1.Product
		if err := cursor.Decode(&product); err != nil {
			return nil, fmt.Errorf("error decoding product: %v", err)
		}
		products = append(products, &product)
	}

	if err := cursor.Err(); err != nil {
		return nil, fmt.Errorf("error iterating cursor: %v", err)
	}

	return products, nil
}

func (db *DB) GetProduct(id string) (*model1.Product, error) {
	collection := colHelper(db, "products")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var product model1.Product
	err = collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&product)
	if err != nil {
		return nil, err
	}

	return &product, nil
}
