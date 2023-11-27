// src/fileUploadService.js
const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);
  
    try {
      const response = await fetch('http://localhost:3000/upload-pdf', {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  export default uploadFile;
  