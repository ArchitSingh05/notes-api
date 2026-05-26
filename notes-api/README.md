# Notes API

A RESTful API built with Spring Boot and PostgreSQL.

## Tech Stack
- Java 21
- Spring Boot 3.3
- Spring Data JPA
- PostgreSQL

## Features
- Full CRUD for notes (Create, Read, Update, Delete)
- Input validation with proper error messages
- Global exception handling

## How to Run
1. Make sure PostgreSQL is running with a database called `notesdb`
2. Update `application.properties` with your PostgreSQL password
3. Run `./mvnw spring-boot:run`
4. API available at `http://localhost:8080/api/notes`

## Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/notes | Get all notes |
| GET | /api/notes/{id} | Get one note |
| POST | /api/notes | Create a note |
| PUT | /api/notes/{id} | Update a note |
| DELETE | /api/notes/{id} | Delete a note |
