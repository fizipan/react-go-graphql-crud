package config

import (
	model "backend/cmd/app/domain/dao"
	"context"
	"net/http"
	"strings"
)

var userCtxKey = &contextKey{"user"}

type contextKey struct {
	id string
}

// AuthMiddleware validates JWT tokens and sets user_id in context
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		// Allow unauthenticated users in
		if authHeader == "" {
			next.ServeHTTP(w, r)
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		claims, err := ValidateJWT(tokenString)
		if err != nil {
			http.Error(w, "invalid token", http.StatusUnauthorized)
			return
		}

		userID, ok := claims["user_id"].(string)
		if !ok {
			http.Error(w, "invalid token payload", http.StatusUnauthorized)
			return
		}

		user := model.User{ID: userID}

		ctx := context.WithValue(r.Context(), userCtxKey, &user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func ForContext(ctx context.Context) *model.User {
	raw, _ := ctx.Value(userCtxKey).(*model.User)
	return raw
}
