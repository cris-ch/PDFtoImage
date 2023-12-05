import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import Canvas from '../components/Canvas';
import InteractiveTools from '../components/InteractiveTools';

function App() {
  const [imageSrc, setImageSrc] = useState('');
  const [selectedTool, setSelectedTool] = useState(null);
  const [canvasElements, setCanvasElements] = useState([]);


  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
  };

  const handleCanvasClick = (e) => {
    if (!selectedTool) return;

    const canvasRect = e.target.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    let newElement;
    if (selectedTool === 'textbox') {
      const textboxHeight = 20; // Fixed height for the textbox
      newElement = {
        type: 'textbox',
        x: x,
        y: y - (textboxHeight / 2),
        height: textboxHeight,
      };
    } else if (selectedTool === 'checkbox') {
      newElement = {
        type: 'checkbox',
        x: x,
        y: y,
        // Add other properties for checkbox if needed
      };
    }

    if (newElement) {
      setCanvasElements([...canvasElements, newElement]);
    }
  };

  const handleElementChange = (index, updatedElement) => {
    console.log('Before update:', canvasElements);

    const newElements = [...canvasElements];
    newElements[index] = updatedElement;
    setCanvasElements(newElements);

    console.log('After update:', newElements);
  };

  const handleExport = () => {
    const exportData = {
      pdfId: 'your-pdf-id',
      elements: canvasElements
    };

    console.log('Exporting:', exportData); // Working correctly
  
    fetch('http://localhost:3000/api/saveCanvasState', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(exportData)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  };
  
  


  return (
    <>
      <div className="max-w-screen-xl mx-auto p-8 text-center">
        <FileUpload onImageUpload={setImageSrc} />
        <div className="flex mt-5">
          <Canvas
            imageSrc={imageSrc}
            selectedTool={selectedTool}
            onCanvasClick={handleCanvasClick}
            elements={canvasElements}
            onElementChange={handleElementChange}
          />
          <div className="w-1/4 bg-gray-100 sticky top-0">
            {/* Make sure this div has a background color if it overlaps any content */}
            <InteractiveTools onToolSelect={handleToolSelect} />
          </div>
        </div>
      </div>
      <button
        className="my-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleExport}
      >
        Export Canvas
      </button>

    </>
  );
}

export default App