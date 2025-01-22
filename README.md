# Project Smartvirtual

## Overview

This project implements a gRPC-based microservices architecture using **NestJS**, **Prisma ORM**, **Docker**, and **Kubernetes**. The system consists of two microservices: **Author Service** and **Book Service**, which interact with each other via gRPC. The project uses **PostgreSQL** for data storage and **Docker** for containerization. **Kubernetes** is used to orchestrate the deployment and scaling of the microservices.

## Task Breakdown

### 1. Services to Implement

There are two microservices: **Author Service** and **Book Service**. Both of these services expose different gRPC methods to manage their respective entities.

#### **Author Service:**
The **Author Service** is responsible for managing CRUD operations for authors. It interacts with a PostgreSQL database, where each author has an `id`, `name`, `email`, and `createdAt` field.

- **Schema:**
  - `id`: UUID (Primary Key)
  - `name`: String
  - `email`: String (Unique)
  - `createdAt`: DateTime
  
- **gRPC Methods:**
  - `createAuthor`: Create a new author.
  - `getAuthor`: Retrieve an author by `id`.
  - `updateAuthor`: Update an existing author.
  - `deleteAuthor`: Delete an author by `id`.
  - `listAuthors`: List all authors.

#### **Book Service:**
The **Book Service** is responsible for managing CRUD operations for books. A book is associated with an author using a foreign key (`authorId`), which references the `Author.id`. The service includes operations like creating, updating, and deleting books, as well as listing books and retrieving books by a specific author.

- **Schema:**
  - `id`: UUID (Primary Key)
  - `title`: String
  - `authorId`: UUID (Foreign Key referencing `Author.id`)
  - `publishedYear`: Int
  - `createdAt`: DateTime
  
- **gRPC Methods:**
  - `createBook`: Create a new book.
  - `getBook`: Retrieve a book by `id`.
  - `updateBook`: Update an existing book.
  - `deleteBook`: Delete a book by `id`.
  - `listBooks`: List all books.
  - `getBooksByAuthor`: Retrieve all books for a given author using a gRPC call to the Author Service.

### 2. Database Setup
We will use **PostgreSQL** as the database for both services. The PostgreSQL database will be containerized and used to persist data for authors and books. The **Prisma ORM** will be used to define the database schema and handle queries, migrations, and schema updates.

### 3. gRPC Communication
The **Book Service** will interact with the **Author Service** via gRPC to ensure that the author exists before creating or updating a book. The communication between services will be defined by `.proto` files, which specify the methods, request/response types, and data structures.

### 4. Docker Setup
The system will be containerized using **Docker**. Below are the essential files to make sure the services can be containerized and communicate with each other.

#### `docker-compose.yml`:
The `docker-compose.yml` file defines the services, including the PostgreSQL database, the Author Service, and the Book Service. It ensures all services can communicate within the same Docker network.

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: author-service
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # SQL script to create the second DB

  author-service:
    image: author-service-image
    container_name: author_service
    restart: always
    environment:
      DATABASE_URL: postgres://postgres:password@postgres:5432/author-service
    depends_on:
      - postgres
    ports:
      - "50051:50051"

  book-service:
    image: book-service-image
    container_name: book_service
    restart: always
    environment:
      DB_URL: postgres://postgres:password@postgres:5432/book-service
      AUTHOR_SERVICE_URL: author-service:50051
    depends_on:
      - postgres
      - author-service
    ports:
      - "50052:50052"

volumes:
  postgres_data:

```

## Dockerfiles for Author and Book Services:
Both services require Dockerfiles to define their environment, install dependencies, and run the applications.

### Author Service and Book Service Dockerfile:
```
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 50051

CMD ["npm", "run", "start:prod"]
```

## Steps to Run Services Locally Using Docker Compose

1. Clone the repository and navigate to the project directory.
2. Ensure Docker is installed and running on your system.
3. Build and run the services using Docker Compose:

```
docker-compose up --build
```

### The Author Service will be exposed at port 50051, and the Book Service will be exposed at port 50052. The PostgreSQL database will be accessible at port 5432.


## Steps to Deploy Services on Kubernetes
1. Install kubectl and configure it to connect to your Kubernetes cluster.
2. Apply the Kubernetes deployment and service files:

```
kubectl apply -f author-service-deployment.yaml
kubectl apply -f book-service-deployment.yaml
kubectl apply -f postgres-deployment.yaml
```

## Apply the ConfigMaps or Secrets for handling environment variables:
```
kubectl apply -f database-secret.yaml
```

## Check the status of the pods:
```
kubectl get pods
```

## Expose the services via a load balancer.


## API Details for gRPC Endpoints

### Author Service
- createAuthor: Creates a new author.

### Request:
```
message CreateAuthorRequest {
  string name = 1;
  string email = 2;
}
```

### Response:
```
message Author {
  string id = 1;
  string name = 2;
  string email = 3;
}
```

- getAuthor: Retrieves an author by id.

### Request:
```
message GetAuthorRequest {
  string id = 1;
}
```

### Response:
```
message Author {
  string id = 1;
  string name = 2;
  string email = 3;
}
```


### Book Service
- createBook: Creates a new book.

### Request:
```
message CreateBookRequest {
  string title = 1;
  string authorId = 2;
  int32 publishedYear = 3;
}
```

### Response:
```
message Book {
  string id = 1;
  string title = 2;
  string authorId = 3;
  int32 publishedYear = 4;
}
```

- getBooksByAuthor: Retrieves all books by a specific author.

### Request:
```
message GetBooksByAuthorRequest {
  string authorId = 1;
}
```

### Response:
```
message BookList {
  repeated Book books = 1;
}
```