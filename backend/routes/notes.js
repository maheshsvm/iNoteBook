const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')

// ROUTE 1 : fetch all user notes using : GET "/api/notes/fetchallnotes". LOGIN required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})

// ROUTE 2 : add a new note using : POST "/api/notes/addnote". LOGIN required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid name of min length 3").isLength({ min: 3 }),
    body('description', 'Enter a description of minimum of length 6').isLength({ min: 6 })
], async (req, res) => {


    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {title , description , tag} = req.body;
        const note = new Note({title,description,tag,user:req.user.id})
        const savedNote = await note.save();
        res.json(savedNote)


    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})

// ROUTE 3 : update a  note using : PUT "/api/notes/updatenote". LOGIN required
router.put('/updatenote/:id' , fetchuser , async (req , res) =>{
    try {
        const {title , description , tag} = req.body;
        const newNote = {};
        if(title) newNote.title = title;
        if(description) newNote.description = description;
        if(tag) newNote.tag = tag;

        const id = req.params.id;

        // checking whether note exist or not
        let note = await Note.findById(id);
        if(!note){ return res.status(400).send("note does not exists")}

        // checking whether uesr is updating its own note or anothers note
        if(note.user.toString() !== req.user.id){return res.status(400).send("access denied")}

        // finally updating note
        note = await Note.findByIdAndUpdate(id , {$set : newNote} , {new : true});

        res.json(note);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})


// ROUTE 4 : deleting a  note using : DELETE "/api/notes/deletenote". LOGIN required
router.delete('/deletenote/:id' , fetchuser , async (req , res) =>{
    try {
        const id = req.params.id;

        // checking whether note exist or not
        let note = await Note.findById(id);
        if(!note){ return res.status(400).send("note does not exists")}

        // checking whether uesr is updating its own note or anothers note
        if(note.user.toString() !== req.user.id){return res.status(400).send("access denied")}

        let status = await Note.findByIdAndDelete(req.params.id)
        res.send(status)
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})
module.exports = router;