import express from "express";
import bodyParser from "body-parser";
import routes from './routes';



const app = express();
app.use(express.json());
app.use(routes); // Ensure this line is present

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

export default app;