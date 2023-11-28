import { useState } from 'react';
import axios from 'axios';

function FileUploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', selectedFile);
    formData.append('originalFileName', selectedFile.name); // Append the original file name


    try {
      const response = await axios.post('http://localhost:3000/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageSrc(response.data.imageUrl); // Use the imageUrl from the response

      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageSrc && <img src={imageSrc} alt="Converted PDF" />}
    </div>
  );
}

export default FileUploadComponent;
