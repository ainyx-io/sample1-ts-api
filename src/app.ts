import express from "express";
import bodyParser from "body-parser";
import routes from './routes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));

app.use("/api",routes);

app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}....`);
});

// const app = express();
// app.use(express.json());
// app.use(routes); // Ensure this line is present

// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// });

export default app;