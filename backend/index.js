const express = require('express')
var app = express()
var cors = require('cors')
var corsOptions = {
    origin: [
        'http://localhost:4200',
        'https://localhost:4200',
        'http://localhost:3000',
        'http://localhost:8080',
    ]
}
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions))
const port = 3000
const mongoose = require('mongoose');


//get all users

app.get('/getUsers', async (req, res) => {
    try{
        const users = await Users.find({});
        res.send(users)
    }catch(err){
        res.send({
            err: err.message
        })
    
    }
})

//get user by id

app.get('/getUser', async (req, res) => {
    try{
        const user = await Users.findById(req.query.id);
        if(user === null){
            res.status(404).send({
                message: 'User not found'
            })
            return;
        }
        res.send(user)
    }catch(err){
        res.send({
            err: err.message
        })
    
    }
});

//create user

app.post('/createUser', async (req, res) => {
    try {
        const user = new Users(req.body)
        await user.validate();
        await user.save();
        res.send(user)
    } catch (e) {
        res.send({
            err: e.message
        })
    }
});

//update user

app.put('/updateUser', async (req, res) => {
    try{
        let newUser = await Users.findById({_id: req.query.id});
        if(newUser === null){
            res.status(404).send({
                message: 'User not found'
            })
            return;
        }
        const user = new Users(req.body)
        await user.validate();
        const a = await Users.updateOne({_id: req.query.id}, req.body);
        newUser = await Users.findById({_id: req.query.id});
        res.send(newUser)
    }catch(err){
        res.send({
            err: err.message
        })
    }
});

//delete user

app.delete('/deleteUser', async (req, res) => {
    try{
        let newUser = await Users.findById({_id: req.query.id});
        if(newUser === null){
            res.status(404).send({
                message: 'User not found'
            })
            return;
        }
        const user = await Users.deleteOne({_id: req.query.id});
        res.send({
            message: 'User deleted successfully'
        })
    }catch(err){
        res.send({
            err: err.message
        })
    }
});

const Users = require('./schemas/user.model.js');


app.listen(port, async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/tanchong')
    } catch (e) {
        res.send({
            err: e.message
        })
    }
    console.log(`Example app listening on port ${port}`)
})