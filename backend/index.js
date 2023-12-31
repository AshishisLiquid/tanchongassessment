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
    try {
        const users = await Users.find({}).sort({ created_at: -1 }).limit(Number(req.query.limit)).skip(Number(req.query.page) * Number(req.query.limit));
        let total = users.length
        let limit = req.query.limit
        if (limit === undefined) {
            limit = 10;
        }
        let pages = Math.ceil(total / Number(limit));
        let page = req.query.page
        if (Number(page) > pages) {
            res.status(400).send({
                message: 'Invalid page number'
            })
            return;
        }
        if (page === undefined) {
            page = 0;
        }
        res.send({
            total: total,
            pages: pages,
            page: page,
            limit: limit,
            hits: users
        })
    } catch (err) {
        res.send({
            err: err.message
        })

    }
})

//get user by id

app.get('/getUser', async (req, res) => {
    try {
        const user = await Users.findById(req.query.id);
        if (user === null) {
            res.status(404).send({
                message: 'User not found'
            })
            return;
        }
        res.send(user)
    } catch (err) {
        res.send({
            err: err.message
        })

    }
});

app.get('/searchUser', async (req, res) => {
    const query = req.query.query;
    if (query === undefined || query === '') {
        res.status(400).send({ err: 'Invalid Query' })
        return;
    }
    try {
        let page = req.query.page
        if (page === undefined) {
            page = 0;
        }
        let limit = req.query.limit
        if (limit === undefined) {
            limit = 10;
        }
        const users = await Users.find({$or: [{name: {$regex: query, $options: 'i'}}, {email: {$regex: query, $options: 'i'}}]}).sort({ created_at: -1 }).limit(Number(req.query.limit)).skip(Number(req.query.page) * Number(req.query.limit));
        let total = users.length
        let pages = Math.ceil(total / Number(limit));
        if (Number(page) > pages) {
            res.status(400).send({
                message: 'Invalid page number'
            })
            return;
        }
        res.send({
            total: total,
            pages: pages,
            page: page,
            limit: limit,
            hits: users
        })
    } catch (err) {
        res.send({
            err: err.message
        })
    }
})

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
    try {
        let newUser = await Users.findById({ _id: req.query.id });
        if (newUser === null) {
            res.status(404).send({
                message: 'User not found'
            })
            return;
        }
        const user = new Users(req.body)
        await user.validate();
        const a = await Users.updateOne({ _id: req.query.id }, req.body);
        newUser = await Users.findById({ _id: req.query.id });
        res.send(newUser)
    } catch (err) {
        res.send({
            err: err.message
        })
    }
});

//delete user

app.delete('/deleteUser', async (req, res) => {
    try {
        let newUser = await Users.findById({ _id: req.query.id });
        if (newUser === null) {
            res.status(404).send({
                message: 'User not found'
            })
            return;
        }
        const user = await Users.deleteOne({ _id: req.query.id });
        res.send({
            message: 'User deleted successfully'
        })
    } catch (err) {
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