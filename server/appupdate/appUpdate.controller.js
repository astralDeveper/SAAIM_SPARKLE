const JWT = require("jsonwebtoken");
const UpdateApp = require("./appUpdate.modle");


exports.createDocument = async (req, res) => {
    try {
      const newDocument = new UpdateApp(req.body);
      await newDocument.save();
      res.status(201).json(newDocument);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Update a document by ID
  exports.updateDocument = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedDocument = await UpdateApp.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedDocument) {
        return res.status(404).json({ error: 'Document not found' });
      }
      res.status(200).json(updatedDocument);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Get all documents
  exports.getAllDocuments = async (req, res) => {
    try {
      const documents = await UpdateApp.find();
      res.status(200).json(documents);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Get a single document by ID
  exports.getDocumentById = async (req, res) => {
    try {
      const { id } = req.params;
      const document = await UpdateApp.findById(id);
      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }
      res.status(200).json(document);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };