const express = require('express');
const mongoose = require('mongoose');
const Contact = require('./model/contact.model.js');
const app = express();
const path = require('path');
//const port = 3000;

app.use(express.static(path.join(__dirname + '/../frontend')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/index1.html'));
});

app.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find({});
        console.log("GETTING");
        res.json(contacts);
    } catch {
        res.status(500).json({messaage: "cannot connect"});
    }
});

app.post("/add", async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        console.log("Added");
        //res.redirect('/');
    } catch {
        res.status(500).json({message: "cannot add"});
        console.log("Error while Added");
    }
});

mongoose.connect(process.env.MONGO_URL).then(() => { 
    console.log("Connected to MongoDB")

    app.listen(process.env.PORT , () => {
        console.log("Backend is up");
    });
}).catch(() => {
    console.log("Connection failed!");
});
