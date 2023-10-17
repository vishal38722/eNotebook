const {
    fetchallnotes,
    addnotes,
    updatenotes,
    deletenotes
  } = require("../controllers/noteController");
  
const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

router.get('/fetchallnotes', fetchuser, [], fetchallnotes)
router.post('/addnotes', fetchuser, [
    body('title', 'Title must be of atleast 2 characters').isLength({ min: 2 }),
    body('description', 'Description must be of atleast 5 characters').isLength({ min: 5 })
], addnotes)
router.put('/updatenotes/:id', fetchuser, updatenotes)
router.delete('/deletenotes/:id', fetchuser, deletenotes)


module.exports = router