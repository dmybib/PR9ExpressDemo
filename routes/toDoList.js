const express = require("express");
const Joi = require('joi');
const Router = express.Router();

let toDoList = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: false },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: false },
    { id: 5, title: "Task 5", completed: false },
    { id: 6, title: "Task 6", completed: false }
];

const toDoSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .required()
});

function getMax(toDoListArray) {
    let Ids = toDoListArray.map(item => item.id);
    return Ids.reduce((max, current) => Math.max(max, current), Ids[0]);
}

Router.route("/")
    .get((request, response) => {
        response.send(toDoList);
    })
    .post((req, res) => {
        const validationResult = toDoSchema.validate(req.body);

        if (validationResult.error) {
            console.log(validationResult.error.message);

            res.status(400).send(validationResult.error.message);
            return;
        }

        const id = getMax(toDoList) + 1;

        const task = {
            id: id,
            title: req.body.title,
            completed: false
        };

        toDoList.push(task);

        res.send(task);
    });

Router.route("/:id")
    .get((request, response) => {
        const product = toDoList.find(item => item.id == request.params.id);

        if(!product) {
            response.status(404).send(`ToDo with id: ${request.params.id} not found`);
            return;
        }

        response.send(product);
    })
    .put((req,res) => {
        const toDo = toDoList.find(item => item.id == req.params.id);

        if(!toDo) {
            res.status(404).send(`ToDo with id: ${req.params.id} not found`);
            return;
        }

        const validationResult = req.body;

        if(validationResult.error){
            console.log(validationResult.error.message);

            res.status(400).send(validationResult.error.message);
            return;
        }

        toDo.completed = req.body.completed;
        res.send(toDo);
    })
    .delete((req, res) => {
        const toDo = toDoList.find(item => item.id == req.params.id);

        if(!toDo) {
            res.status(404).send(`Product with id: ${req.params.id} not found`);
            return;
        }

        const indexOfProduct = toDoList.indexOf(toDo);
        toDoList.splice(indexOfProduct, 1);

        res.status(200).send(toDo);
    });

module.exports = Router;