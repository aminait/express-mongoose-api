## Projects Routes (base URL + resource)

| Route                           | HTTP Verb | Route Middleware | Description           | Params |
| ------------------------------- | --------- | ---------------- | --------------------- | ------ |
| /api/organizations/:id/projects | GET       |                  | Gets projects by org  |
| /api/organizations/:id/projects | POST      |                  | Creates a new project |
| /api/projects/:id               | GET       |                  | Retrieve a project    |
| /api/projects/:id               | PUT       |                  | Updates a project     |
| /api/projects/:id/publish       | POST      |                  | Publishes a project   |
| /api/projects/:id/unpublish     | POST      |                  | Unpublishes a project |
| /api/projects/:id/cancel        | POST      |                  | Cancels a project     |
| /api/projects/:id               | DELETE    |                  | Deletes a project     |
