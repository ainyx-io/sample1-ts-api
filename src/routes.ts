import { Router, Request, Response } from "express";
import pool from "./database";

const routes = Router();

interface Todo {
    id: number;
    task: Text; // Assuming the column name is task
    completed: boolean;
}

// Simple message
routes.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the To-Do List App!");
});

// Get all the tasks route
routes.get("/todos", async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM todos");
        const todos: Todo[] = result.rows;
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos", error);
        res.status(500).json({ error: "Error fetching todos" });
    }
});

// Create task route--->for single task-->post request
// routes.post("/todos", async (req: Request, res: Response)=> {
//     const { task } = req.body;

// Validate task-->for the single task
// if (typeof task !== "string" || task.trim() === "") {
//    res.status(400).json({ error: "Invalid task data" });
// }

//        try {
//         const result = await pool.query(
//             "INSERT INTO todos (task) VALUES ($1) RETURNING *",
//             [task]
//         );
//         const createdTodo: Todo = result.rows[0];
//         res.status(201).json(createdTodo);
//     } catch (error) {
//         console.error("Error adding todo", error);
//         res.status(500).json({ error: "Error adding todo" });
//     }
// });

//for multiple tasks:
routes.post("/todos", async (req: Request, res: Response) => {
    const { tasks } = req.body; // Expect an array of tasks

    // Validate that 'tasks' is an array and contains at least one task
    if (!Array.isArray(tasks) || tasks.length === 0) {
         res.status(400).json({ error: "Invalid task data" });
    }

    try {
        const createdTodos: Todo[] = [];
        for (const task of tasks) {
            if (typeof task === "string" && task.trim() !== "") {
                const result = await pool.query(
                    "INSERT INTO todos (task) VALUES ($1) RETURNING *",
                    [task]
                );
                createdTodos.push(result.rows[0]);
            }
        }
        res.status(201).json(createdTodos);
    } catch (error) {
        console.error("Error adding todos", error);
        res.status(500).json({ error: "Error adding todos" });
    }
});


//Delete task route
routes.delete("/todos/:id", async (req: Request, res: Response) => {
    const todoID = parseInt(req.params.id, 10);

    // Validate todoID
    if (isNaN(todoID)) {
        res.status(400).json({ error: "Invalid todo ID" });
    }

    try {
        await pool.query("DELETE FROM todos WHERE id = $1", [todoID]);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error deleting todo", error);
        res.status(500).json({ error: "Error deleting todo" });
    }
});

// Update task route
routes.put("/todos/:id", async (req: Request, res: Response): Promise<void> => {
    const todoID = parseInt(req.params.id, 10);
    const { task } = req.body;

    // Validate task
    if (typeof task !== "string" || task.trim() === "") {
        res.status(400).json({ error: "Invalid task data" });
    }

    try {
        const result = await pool.query("UPDATE todos SET task = $1 WHERE id = $2", [
            task,
            todoID,
        ]);

            // Check if any rows were affected
            if (result.rowCount === 0) {
                res.status(404).json({ error: "Todo not found" });
            }

        res.sendStatus(200);
    } catch (error) {
        console.error("Error updating todo", error);
        res.status(500).json({ error: "Error updating todo" });
    }
});

export default routes;
