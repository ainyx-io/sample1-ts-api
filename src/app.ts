import express from "express";
import bodyParser from "body-parser";
import routes from './routes';
import cors from 'cors' ; // Import CORS

const app = express();

// Use CORS to allow requests from your frontend
app.use(cors({
    origin: "http://localhost:3000" // or specify the correct port for the frontend if different
  }));


app.use(bodyParser.json()); // Needed for parsing JSON in requests
app.use(express.json());
app.use(routes); // Ensure this line is present and functional

const validCredentials = {
    username: 'admin',
    password: 'admin'
};

// Login endpoint
app.post('/Login', (req, res) => {
    const { username, password } = req.body;
    console.log("Received credentials:", username, password); // For debugging

    // Check if provided credentials match valid credentials
    if (username === validCredentials.username && password === validCredentials.password) {
        res.send({
            token: 'test123'
        });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});

export default app;
