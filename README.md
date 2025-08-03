# Book Store Management API

A Node.js RESTful API for managing books and users, with authentication and user roles.

## Features

- User registration and login (JWT authentication)
- User roles: admin, customer, doctor, patient
- Add books, update, delete, and view books
- Users can add books to their favorites
- Protected routes for user actions

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/book-store-management.git
cd book-store-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file and add:

```
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the server

```bash
nodemon server.js
```

## API Endpoints

### User

- `POST /users/signup` — Register a new user
- `POST /users/login` — Login and get JWT token
- `GET /users` — Get all users (protected)
- `POST /users/fav` — Add book to favorites (protected)

### Book

- `POST /books` — Add a new book
- `GET /books` — Get all books
- `GET /books/:id` — Get book by ID
- `PATCH /books/:id` — Update book
- `DELETE /books/:id` — Delete book

## Testing with Postman

- Use the provided endpoints.
- For protected routes, add an `Authorization: Bearer <token>` header.

## License

MIT
