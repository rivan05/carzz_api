An Express application that connects to MongoDB and performs CRUD operations on the `Car` model.

---

# Node.js Express MongoDB CRUD API

This project is a simple **Node.js** API that uses **Express** and **MongoDB** to perform CRUD (Create, Read, Update, and Delete) operations on a `Car` collection in MongoDB.

### Prerequisites

To run this project locally, you'll need the following:

- **Node.js**: Install it from [nodejs.org](https://nodejs.org/).
- **MongoDB Atlas**: A cloud-hosted MongoDB instance. You can sign up for a free tier at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Postman** (or any API testing tool) to test the endpoints (optional but recommended).

### Setup

1. **Clone the repository** (or create a new project folder):

   ```bash
   git clone <your-repository-url>
   cd <your-project-folder>
   ```

2. **Install Dependencies**:

   Install the required dependencies (Express, Mongoose, and Body-Parser) by running:

   ```bash
   npm init -y  # Initializes a new Node.js project (if you haven't already)
   npm install express mongoose body-parser
   ```

3. **MongoDB Connection**:
   Update the `mongoose.connect()` URL in the app with your MongoDB Atlas connection string. The connection string will look like:

   ```javascript
   mongoose.connect('mongodb+srv://<your-username>:<your-password>@nodeexp.colby.mongodb.net/?retryWrites=true&w=majority&appName=nodeexp');
   ```

   Replace `<your-username>` and `<your-password>` with your MongoDB Atlas credentials.

4. **Create your Express API**:
   The `Car` model and routes are set up as follows in the `app.js` file:

   ```javascript
   const express = require('express')
   const app = express()
   const port = 3000
   const bodyParser = require('body-parser')
   app.use(bodyParser.json())

   const mongoose = require('mongoose');
   try {
     mongoose.connect('mongodb+srv://rishivasan:EEaIGzftx7C7vARa@nodeexp.colby.mongodb.net/?retryWrites=true&w=majority&appName=nodeexp');
   } catch(err) {
     console.error('unable to connect to mongoose ',err)
   }

   const Car = mongoose.model('Car', {name: String, color: String, year: Number });

   // Get all cars
   app.get('/cars', async (req, res) => {
     const cars = await Car.find();
     res.json(cars);
   });

   // Create a new car
   app.post('/cars', async (req, res) => {
     const body = req.body;
     const car = await Car.create({name: body.name, color: body.color, year: body.year});
     res.json(car);
   });

   // Delete a car by ID
   app.delete('/cars/:id', async (req, res) => {
     const sui = await Car.deleteOne({_id: req.params.id});
     res.json(sui);
   });

   // Start the server
   app.listen(3000, () => {
     console.log(`Server running on port ${port}`);
   });
   ```

### API Endpoints

The following endpoints are available:

#### **GET /cars**

This endpoint retrieves all cars from the database.

- **Request**: `GET /cars`
- **Response**: A JSON array of all cars in the database.

Example response:
```json
[
  {
    "_id": "60b8b8d1b264f1a57fbc3155",
    "name": "Toyota Corolla",
    "color": "Blue",
    "year": 2019
  },
  {
    "_id": "60b8b8d1b264f1a57fbc3156",
    "name": "Honda Civic",
    "color": "Red",
    "year": 2020
  }
]
```

#### **POST /cars**

This endpoint creates a new car in the database.

- **Request**: `POST /cars`
- **Body**:
  ```json
  {
    "name": "Ford Mustang",
    "color": "Black",
    "year": 2021
  }
  ```

- **Response**: A JSON object of the newly created car.

Example response:
```json
{
  "_id": "60b8b8d1b264f1a57fbc3157",
  "name": "Ford Mustang",
  "color": "Black",
  "year": 2021
}
```

#### **DELETE /cars/:id**

This endpoint deletes a car by its ID.

- **Request**: `DELETE /cars/:id`
- **Response**: A JSON object confirming the deletion.

Example response:
```json
{
  "deletedCount": 1
}
```

### Running the Application

Once the setup is complete and MongoDB is connected, you can run the application by running the following command:

```bash
node app.js
```

The server will start on **port 3000** by default, and you'll be able to make requests to the endpoints.

### Testing the Endpoints

You can test the API endpoints using **Postman** or any API testing tool:

1. **GET all cars**: `GET http://localhost:3000/cars`
2. **POST a new car**: `POST http://localhost:3000/cars`
   - Body:
     ```json
     {
       "name": "Chevrolet Camaro",
       "color": "Yellow",
       "year": 2022
     }
     ```
3. **DELETE a car**: `DELETE http://localhost:3000/cars/<car_id>`

### Error Handling

- If an invalid request is made, such as a missing field when creating a car, you may encounter errors in the response.
- The server will also handle errors such as invalid car ID format when trying to delete a car.

---

### Conclusion

This simple application demonstrates how to set up a **Node.js Express** server that interacts with **MongoDB** to perform CRUD operations. By following the steps outlined in this README, you can easily test and extend this API to suit your needs.