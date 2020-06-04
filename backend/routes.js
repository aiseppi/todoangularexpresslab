// require the Express module
const express = require("express");

//creates a new router object
const todosList = express.Router();
// STEP 2  - CONNECTION/DATABASE -- require connection js 
const pool = require("./connection");


todosList.get("/todo-items", (req, res) => {
    pool.query("SELECT * FROM todos").then(result => {
        console.log(result);
        console.log(result.rows);
        //request to get back all of the rows
        res.json(result.rows);
    });
});


// route
todosList.post("/todo-items", (req, res) => {
    pool.query("INSERT INTO todos (task, completed) VALUES ($1::text, $2::boolean)",
        [req.body.task, req.body.completed]).then(() => {
            res.json(req.body);
        });
});


todosList.put("/todo-items/:id", (req, res) => {
    pool.query("UPDATE todos SET completed=$1::int WHERE id=$2::int",
        [req.body.completed, req.params.id]).then(() => {
            res.json(req.body);
        });

});

// route
todosList.delete("/todo-items/:id", (req, res) => {
    pool.query("DELETE FROM todos WHERE id=$1::int", [req.params.id]).then(() => {
        res.sendStatus(200).json(`${req.params.id}`);
    });

});

module.exports = { todosList };
