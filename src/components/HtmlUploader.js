import React, { useState } from 'react';

function HtmlUploader() {
  const [files, setFiles] = useState([]);

  const handleFolderChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    if (files.length > 0) {
      // Utiliza caches.keys() para obtener todas las cachés y buscar la generada por Workbox
      caches.keys().then((cacheNames) => {
        // Encuentra la caché precacheada de Workbox
        const workboxCache = cacheNames.find((name) => name.startsWith('workbox-precache'));

        if (workboxCache) {
          caches.open(workboxCache).then((cache) => {
            files.forEach((file) => {
              const filePath = file.webkitRelativePath;

              // Crear una nueva respuesta con el tipo de contenido detectado
              let response = new Response(file);

              // Si el archivo no tiene extensión, asignar 'text/html'
              if (!file.name.includes('.')) {
                response = new Response(file, {
                  headers: { 'Content-Type': 'text/html' },
                });
              }

              cache.put(filePath, response);
            });

            alert('Carpeta subida a la cache de Workbox!');
          });
        } else {
          alert('No se encontró la cache de Workbox.');
        }
      });
    } else {
      alert('Por favor, selecciona una carpeta primero.');
    }
  };

  return (
    <div>
      <h1>Subir Carpeta a Cache</h1>
      <input 
        type="file" 
        webkitdirectory="true" 
        directory="true" 
        multiple 
        onChange={handleFolderChange} 
      />
      <button onClick={handleUpload}>Subir Carpeta a Cache</button>
    </div>
  );
}

export default HtmlUploader;
