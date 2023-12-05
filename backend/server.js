const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const CanvasState = require('./models/CanvasState');

const mongoURI = 'mongodb+srv://pdf:pdf1234@cluster0.oomwruk.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use('/output', express.static('output'));
app.use(express.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')  // Destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)  // Use the original file name
    }
});

const upload = multer({ storage: storage });
app.post('/upload-pdf', upload.single('pdf'), (req, res) => {
    const pdfPath = req.file.path;
    const outputFolder = 'output';
    const originalFileName = req.body.originalFileName; // Get the original file name
    const pdfId = req.body.pdfId; // Extract the PDF identifier


    exec(`python3 convert_pdf_to_images.py ${pdfPath} ${outputFolder} "${originalFileName}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(`Error converting PDF: ${stderr}`);
        }
        if (stderr) {
            console.error(`Script Error: ${stderr}`);
            return res.status(500).send(`Error in script: ${stderr}`);
        }
        const imageName = path.parse(originalFileName).name + ".jpg";
        const imageUrl = `${req.protocol}://${req.get('host')}/output/${imageName}`;
        res.json({ imageUrl: imageUrl, pdfId: pdfId });
    });
    
});

app.post('/api/saveCanvasState', (req, res) => {
    console.log('Received data:', req.body);

    try {
        const newCanvasState = new CanvasState(req.body);
        console.log('Data to be saved:', newCanvasState);

        newCanvasState.save()
            .then(item => res.json(item))
            .catch(err => {
                console.error('Error saving:', err);
                res.status(400).json({ error: err.message });
            });
    } catch (error) {
        console.error('Error during instantiation:', error);
        res.status(500).json({ error: error.message });
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
