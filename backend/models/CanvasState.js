const mongoose = require('mongoose');

const canvasStateSchema = new mongoose.Schema({
    pdfId: String,
    elements: [
        {
            elementType: String,
            x: Number,
            y: Number,
            content: { type: String, default: '' },
            checked: { type: Boolean, default: false },
            width: Number,
            height: Number
        }
    ]
});

const CanvasState = mongoose.model('CanvasState', canvasStateSchema);

module.exports = CanvasState;