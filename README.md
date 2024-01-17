POST    http://localhost:3000/auth/register
{
  "username": "Test User",
  "email": "testuser@email.com",
  "password": "default"
}

POST    http://localhost:3000/auth/login
{
  "email": "testuser@email.com",
  "password": "default"
}

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWE2YWFhMDlhNzQ1YzFlOWE4MzViNGIiLCJpYXQiOjE3MDU0MjE1OTEsImV4cCI6MTcwNTQyNTE5MX0.n1SWfh-bc-_-eBIvAUVDCnW3qwXqgqwUa3jlQqzupio"
}

TASK ________________________________________________________
POST: http://localhost:3000/tasks/
Header - Authorization: user token
{ 
    "title": "Buy Rice", 
    "description":"Go to market", 
    "deadline": "2024-01-30" 
}

GET: http://localhost:3000/tasks/user/65a6aaa09a745c1e9a835b4b
Header - Authorization: user token

PUT: http://localhost:3000/tasks/65a6ac42ffdb849a8d5f8532
Header - Authorization: user token
{ 
    "title": "Buy Rice market", 
    "description":"Go to store store store", 
    "deadline": "2024-02-08",
    "status": true 
}




