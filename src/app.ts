import express from "express";
import bodyParser from "body-parser";
import routes from './routes';


const app = express();

// Static valid credentials for demonstration
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
        res.status(401).send('Invalid credentials');
    }
});
app.use(express.json());
app.use(routes); // Ensure this line is present









app.listen(3000, () => {
    console.log("Server running on port 3000");
});

export default app;