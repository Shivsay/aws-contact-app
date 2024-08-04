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

// get all contacts
app.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find({});
        console.log("GETTING");
        res.json(contacts);
    } catch {
        res.status(500).json({messaage: "cannot connect"});
    }
});

// add a new contact
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

// edit an existing contact
app.put("/edit/:id", async (req, res) => {
    try {
        const contactId = req.params.id;
        const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        console.log("Contact updated successfully:", updatedContact);
        res.json(updatedContact);
    } catch (error) {
        console.error("Error while updating contact:", error);
        res.status(500).json({ message: "Cannot update contact" });
    }
});

// delete a contact
app.delete("/delete/:id", async (req, res) => {
    try {
        const contactId = req.params.id;
        const deletedContact = await Contact.findByIdAndDelete(contactId);
        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        console.log("Contact deleted successfully:", deletedContact);
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error("Error while deleting contact:", error);
        res.status(500).json({ message: "Cannot delete contact" });
    }
});

// connecting to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => { 
    console.log("Connected to MongoDB")

    app.listen(process.env.PORT , () => {
        console.log("Backend is up");
    });
}).catch(() => {
    console.log("Connection failed!");
});
