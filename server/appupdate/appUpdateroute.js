const express = require('express');
const router = express.Router();
const myController = require('./appUpdate.controller');

// Route for creating a new document
router.post('/updateApp', myController.createDocument);

// Route for updating a document by ID
router.put('/updateApp/:id', myController.updateDocument);

// Route for getting all documents
router.get('/getUpdate', myController.getAllDocuments);

// Route for getting a document by ID
router.get('/getUpdate/:id', myController.getDocumentById);

module.exports = router;