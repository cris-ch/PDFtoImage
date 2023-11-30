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
    if (!selectedTool || selectedTool !== 'textbox') return;

    const canvasRect = e.target.getBoundingClientRect();
    const textboxHeight = 20; // Assuming a fixed height of 20px for the textbox
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top - (textboxHeight / 2); // Adjust Y position

    const newElement = {
      type: selectedTool,
      x: x,
      y: y,
      height: textboxHeight,
    };

    setCanvasElements([...canvasElements, newElement]);
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
            elements={canvasElements} // Pass the canvas elements here
          />
          <div className="w-1/4 bg-gray-100 sticky top-0">
            {/* Make sure this div has a background color if it overlaps any content */}
            <InteractiveTools onToolSelect={handleToolSelect} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App