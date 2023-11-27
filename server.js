const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const app = express();
const cors = require('cors');

app.use(cors());

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

    console.log(`Calling Python script with: ${pdfPath}, Original File Name: ${originalFileName}`);

    exec(`python3 convert_pdf_to_images.py ${pdfPath} ${outputFolder} "${originalFileName}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution Error: ${error}`);
            return res.status(500).send(`Error converting PDF: ${stderr}`);
        }
        if (stderr) {
            console.error(`Script Error: ${stderr}`);
            return res.status(500).send(`Error in script: ${stderr}`);
        }
        const imagePaths = stdout.split('\n').filter(path => path.trim());
        console.log(`Received image paths: ${imagePaths}`);

        res.json({ images: imagePaths });
    });
    
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
