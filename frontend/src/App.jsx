import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import ImageDisplay from '../components/ImageDisplay';
import InteractiveTools from '../components/InteractiveTools';

function App() {
  const [imageSrc, setImageSrc] = useState('');


  // Function to handle tool selection
  const handleToolSelect = (tool) => {
    console.log("Selected tool:", tool);
    // Add further logic for tool selection
  };


  return (
    <>
      <div className="max-w-screen-xl mx-auto p-8 text-center">
        <FileUpload onImageUpload={setImageSrc} />
        <div className="flex mt-5">
          <div className="flex-1">
            {/* Container for the image */}
            <ImageDisplay imageSrc={imageSrc} />
          </div>
          <div className="w-1/4 bg-gray-100">
            {/* Container for interactive tools */}
            <InteractiveTools />
          </div>
        </div>
      </div>

    </>
  )
}

export default App