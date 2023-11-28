const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const app = express();
const cors = require('cors');
const path = require('path');


app.use(cors());
app.use('/output', express.static('output'));


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
        res.json({ imageUrl: imageUrl });
    });
    
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
