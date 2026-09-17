# Task Manager

Task Management application built with:

- React
- Node.js
- Express
- PostgreSQL
- Prisma

## Application

The application allows users to:

- Create tasks
- List tasks
- Update tasks
- Mark tasks as completed
- Delete tasks

## Backend

The backend exposes:

GET /api/health

GET /api/tasks

GET /api/tasks/:id

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id

## Backend Environment

DATABASE_URL=postgresql://taskuser:taskpassword@localhost:5432/taskdb

PORT=3000

## Frontend

The frontend communicates with the backend through:

/api

## Development

Backend:

npm install

npm run prisma:generate

npm start

Frontend:

npm install

npm run dev