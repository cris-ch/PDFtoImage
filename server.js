const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const app = express();
const upload = multer({ dest: 'uploads/' }); // Configure multer for file upload

app.post('/upload-pdf', upload.single('pdf'), (req, res) => {
    const pdfPath = req.file.path;
    const outputFolder = 'output';

    exec(`python3 convert_pdf_to_images.py ${pdfPath} ${outputFolder}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution Error: ${error}`);
            return res.status(500).send(`Error converting PDF: ${stderr}`);
        }
        if (stderr) {
            console.error(`Script Error: ${stderr}`);
            return res.status(500).send(`Error in script: ${stderr}`);
        }
        const imagePaths = stdout.split('\n').filter(path => path.trim());
        res.json({ images: imagePaths });
    });
    
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
