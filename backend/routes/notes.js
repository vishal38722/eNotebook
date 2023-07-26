// we can write this code (request and response) in index.js but to maintain a better managemnt
// we are writing this code in this separate file

const express = require('express');
const router = express.Router();
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1 : Get all the Notes of loggedIn user using GET method : api/notes/fetchalluser - Login required
router.get('/fetchallnotes', fetchuser, [], async (req, res) => {      
    try {
    // find function will find all the notes related to the specified user     
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE 2 : Add a Note using POST method : api/notes/addnotes - Login required
router.post('/addnotes', fetchuser, [
    body('title', 'Title must be of atleast 2 characters').isLength({ min: 2 }),
    body('description', 'Description must be of atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {      

    try {
    // Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructuring of the request body
    const {title, description, tag} = req.body;

    // creating a new Note with title, description, tage and user id
    const note = new Note ({
        title, description, tag, user : req.user.id
    })

    // save the created note
    const savedNote = await note.save();
    // return the saved note as response
    res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE 3 : Update an existing Note using PUT method : api/notes/updatenotes - Login required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    // destructuring of the request body
    const {title, description, tag} = req.body;

    try{
    // create a newNote object
    const newNote = {}

    //if user updated anything then only update that in your newNote
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    // find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if(!note){return req.status(404).send("Not Found")}

    // if the user id corresponding to the note to be updated is not same as that of
    // the user id of the loggedIn user then don't allow user to do so
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4 : Deleta an existing Note using DELETE method : api/notes/deletenotes - Login required
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
    // find the note to be deleted and delete it
    let note = await Note.findById(req.params.id)
    if(!note){return req.status(404).send("Not Found")}

    // if the user id corresponding to the note to be deleted is not same as that of
    // the user id of the loggedIn user then don't allow user to do so
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted",note:note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router