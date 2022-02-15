## Users Routes (base URL + resource)

| Route                  | HTTP Verb | Route Middleware   | Description                          |
| ---------------------- | --------- | ------------------ | ------------------------------------ |
| /api/users             | GET       |                    | Get list of users                    |
| /api/users             | POST      |                    | Creates a new user                   |
| /api/users/:id         | GET       | `isAuthenticated`  | Get a single user                    |
| /api/users/:id         | DELETE    | `hasRole('admin')` | Deletes a user, restriction: 'admin' |
| /api/users/me          | GET       | `isAuthenticated`  | Get my info                          |
| /api/users:id/password | PUT       | `isAuthenticated`  | Change a users password              |
