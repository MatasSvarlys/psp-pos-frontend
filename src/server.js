const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');  // Make sure db.json is the correct path to your data
const middlewares = jsonServer.defaults();

// Use default middlewares (for logging, static, etc.)
server.use(middlewares);

// Set up custom routes if necessary
server.use('/Api', router);  // Example of routing through /Api

// Start the server on port 5000
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});
