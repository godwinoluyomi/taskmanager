# Taskmanager

## App URL
https://taskmanagerapp-theta.vercel.app

## API Documentation
BASE URL: https://taskmanager-lime.vercel.app

### Register
POST /auth/register
```
{
"username": "Test User",
"email": "testuser@mail.com",
"password": "default"
}
```
Response
```
{
message: "User registered successfully",
user: {
        "_id": "****",
        "username": "Test User",
        "email": "testuser@mail.com",
        "__v": 0
    },
}
```
### Login
POST auth/login
```
{
"email": "testuser@mail.com",
"password": "default"
}
```
Response
```
{
    "user": {
        "_id": "****",
        "username": "Test User",
        "email": "testuser@mail.com",
        "__v": 0
    },
    "token": "****",
    "isAuthenticated": true
}
```
### ADD TASK
POST: /tasks

Header - Authorization: token
```
{
"title": "Buy Rice",
"description":"Go to market",
"deadline": "2024-01-30"
}
```

### FETCH USER TASK
GET: /tasks/user/****

Response
```
[
    {
        "_id": "***",
        "title": "Buy clothes",
        "deadline": "2024-01-27T00:00:00.000Z",
        "status": false,
        "userId": "***",
        "createdAt": "2024-01-19T09:12:46.224Z",
        "__v": 0
    },
]
```

Header - Authorization: token

### FETCH USER TASK TODAY
GET: /tasks/today/****

Header - Authorization: token

Response is same a Fetch User Task

### UPDATE USER TASK
PUT: /tasks/****

Header - Authorization: token

Response is same a Fetch User Task
