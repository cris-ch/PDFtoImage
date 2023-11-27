// src/fileUploadService.js
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('pdf', file);

  const response = await fetch('http://localhost:3000/upload-pdf', {
    method: 'POST',
    body: formData,
  });

  return response.json();
};
  
  export default uploadFile;
  