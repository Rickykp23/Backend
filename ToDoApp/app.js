// Import the express library to create a web server
const express = require("express");

// Instantiate an Express application
const app = express();

// Define a port number for the server to listen on
const PORT = 3000;

// Use middleware to automatically parse JSON formatted request bodies
app.use(express.json());

// Create an in-memory array to simulate a database for tasks
let tasks = [
  { id: 1, description: "Complete homework", completed: false },
  { id: 2, description: "Read a book", completed: true },
];

// Define a route to handle GET requests to "/tasks", which returns all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks); // Send a 200 OK status and the list of tasks in JSON format
});

// Define a route to handle POST requests to "/tasks", which adds a new task
app.post("/tasks", (req, res) => {
  console.log("Received body:", req.body); // Log the body of the incoming request to the console
  // Create a new task object using the data provided in the request body or default values
  const newTask = {
    id: tasks.length + 1, // Assign an ID that is one greater than the number of tasks
    description: req.body.description || "No description provided", // Use the description from the request or a default
    completed: req.body.completed !== undefined ? req.body.completed : false, // Use the completed status from the request or default to false
  };
  console.log("Adding new task:", newTask); // Log the new task object to the console
  tasks.push(newTask); // Add the new task to the array of tasks
  res.status(201).json(newTask); // Respond with a 201 Created status and the new task
});

// Define a route to handle PUT requests to "/tasks/:id", which updates an existing task
app.put("/tasks/:id", (req, res) => {
  // Find the task in the array that matches the id provided in the URL
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  // If no task is found, send a 404 Not Found status
  if (!task) return res.status(404).send("Task not found.");

  // Update the task's description and completed status with the data from the request or retain the existing values
  task.description = req.body.description || task.description;
  task.completed =
    req.body.completed !== undefined ? req.body.completed : task.completed;
  // Respond with a 200 OK status and the updated task
  res.status(200).json(task);
});

// Define a route to handle DELETE requests to "/tasks/:id", which removes an existing task
app.delete("/tasks/:id", (req, res) => {
  // Remove the task that matches the id provided in the URL from the array
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  // Respond with a 204 No Content status as there is no content to return
  res.status(204).send();
});

// Start the server and listen on the defined PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message to the console when the server starts
});
