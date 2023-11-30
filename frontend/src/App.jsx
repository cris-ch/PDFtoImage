import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import Canvas from '../components/Canvas';
import InteractiveTools from '../components/InteractiveTools';

function App() {
  const [imageSrc, setImageSrc] = useState('');
  const [selectedTool, setSelectedTool] = useState(null);

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
  };

  const handleCanvasClick = (e) => {
    if (!selectedTool) return;
    console.log(`Tool ${selectedTool} used at position:`, e.clientX, e.clientY);
    // Future: Add logic to place the selected interactive element on the canvas
  };
  return (
    <>
      <div className="max-w-screen-xl mx-auto p-8 text-center">
        <FileUpload onImageUpload={setImageSrc} />
        <div className="flex mt-5">
          <div className="flex-1">
            {/* Container for the image */}
            <Canvas imageSrc={imageSrc} selectedTool={selectedTool} onCanvasClick={handleCanvasClick} />
          </div>
          <div className="w-1/4 bg-gray-100">
            {/* Container for interactive tools */}
            <InteractiveTools onToolSelect={handleToolSelect} />
          </div>
        </div>
      </div>

    </>
  )
}

export default App