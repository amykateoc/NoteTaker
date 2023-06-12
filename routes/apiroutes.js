const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const notesData = require('../db/db.json')
const { v4: uuidv4 } = require('uuid');

//GET route for opening the notes.html page
    router.get('/notes', (req, res) => {
        // readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
        // console.log('notes page!')
        const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8'))
        res.json(savedNotes)
    });


//GET route for adding a new note
router.post('/notes', (req, res) => {
    console.log('It works', req.body)
    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8'))
    req.body.id = uuidv4()
    savedNotes.push(req.body)
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(savedNotes))
    res.json({message: "note saved"})
});

//GET route for retrieving a specific note
router.delete('/notes/:id', (req, res) => {
    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8'))
    const filteredNotes = savedNotes.filter((note) => note.id !== req.params.id)
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(filteredNotes))
    res.json({message: 'note deleted'})
  });

module.exports = router;