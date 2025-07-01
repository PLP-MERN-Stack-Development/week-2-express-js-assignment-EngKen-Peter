This project is a RESTful API built using Express.js. It allows you to create, read, update, and delete product data. It also includes custom middleware for logging, authentication, and validation.

Project Structure

server.js

routes/products.js

middleware/logger.js

middleware/auth.js

middleware/validateProduct.js

.env

README.md

Setup Instructions

Clone the repository to your local machine.

Navigate into the project directory.

Install dependencies using:

nginx
Copy
Edit
npm install
Create a .env file in the root directory and add the following content:

ini
Copy
Edit
PORT=3000
AUTH_TOKEN=12345
Start the server using:

nginx
Copy
Edit
node server.js
The server will run on http://localhost:3000.

API Endpoints

Base URL: http://localhost:3000/api/products

Get all products
Method: GET
URL: /api/products
Response:

[
  {
    "id": "uuid",
    "name": "Sample Product",
    "description": "Product description",
    "price": 100,
    "category": "General",
    "inStock": true
  }
]
Get a specific product by ID
Method: GET
URL: /api/products/:id
Response:

{
  "id": "uuid",
  "name": "Sample Product",
  "description": "Product description",
  "price": 100,
  "category": "General",
  "inStock": true
}
Create a new product
Method: POST
URL: /api/products
Headers:
Authorization: Bearer 12345
Body (JSON):

{
  "name": "Keyboard",
  "description": "Mechanical keyboard",
  "price": 2000,
  "category": "Electronics",
  "inStock": true
}
Response:

{
  "id": "generated-uuid",
  "name": "Keyboard",
  "description": "Mechanical keyboard",
  "price": 2000,
  "category": "Electronics",
  "inStock": true
}
Update a product by ID
Method: PUT
URL: /api/products/:id
Headers:
Authorization: Bearer 12345
Body (JSON):

{
  "price": 1800,
  "inStock": false
}
Response:

{
  "id": "uuid",
  "name": "Keyboard",
  "description": "Mechanical keyboard",
  "price": 1800,
  "category": "Electronics",
  "inStock": false
}
Delete a product by ID
Method: DELETE
URL: /api/products/:id
Headers:
Authorization: Bearer 12345
Response:

{
  "message": "Product deleted",
  "product": {
    "id": "uuid",
    "name": "Keyboard",
    "description": "Mechanical keyboard",
    "price": 1800,
    "category": "Electronics",
    "inStock": false
  }
}
Middleware Used

logger.js: Logs HTTP method and URL for every request.

auth.js: Checks for a valid Bearer token in the Authorization header.

validateProduct.js: Ensures required product fields are present during POST requests.

Dependencies

express

body-parser

uuid

dotenv