import React, { useState } from 'react';

function CacheUploader() {
  const [files, setFiles] = useState([]);

  // Simulando la "selección" de archivos desde la carpeta interna de la aplicación
  const handleFolderChange = () => {
    const simulatedFiles = [
      { name: 'theme-kobo.css', path: '/x/css/theme-kobo.css' },
      { name: 'theme-kobo.print.css', path: '/x/css/theme-kobo.print.css' },
      { name: 'fontawesome-webfont.woff', path: '/x/fonts/fontawesome-webfont.woff' },
      { name: 'OpenSans-Bold-webfont.woff', path: '/x/fonts/OpenSans-Bold-webfont.woff' },
      { name: 'OpenSans-Regular-webfont.woff', path: '/x/fonts/OpenSans-Regular-webfont.woff' },
      { name: 'favicon.ico', path: '/x/images/favicon.ico' },
      { name: 'icon_180x180.png', path: '/x/images/icon_180x180.png' },
      { name: 'offline-enabled.png', path: '/x/images/offline-enabled.png' },
      { name: 'enketo-webform.js', path: '/x/js/build/enketo-webform.js' },
      { name: 'chunk-A3YKJL34.js', path: '/x/js/build/chunks/chunk-A3YKJL34.js' },
      { name: 'chunk-OCWFK4B6.js', path: '/x/js/build/chunks/chunk-OCWFK4B6.js' },
      { name: 'chunk-EC2TFN7F.js', path: '/x/js/build/chunks/chunk-EC2TFN7F.js' },
      { name: 'translation-combined.json', path: '/x/locales/build/en/translation-combined.json' },
      { name: 'translation-combined-es.json', path: '/x/locales/build/es/translation-combined.json' },
      { name: 'TwrsDY99', path: '/x/TwrsDY99' },
      // Agrega más archivos aquí según lo necesites
    ];

    setFiles(simulatedFiles);
  };

  const handleUpload = () => {
    if (files.length > 0) {
      caches.open('form-case').then((cache) => {
        files.forEach((file) => {
          const filePath = file.path;

          // Fetch el archivo desde el servidor
          fetch(filePath)
            .then((response) => {
              if (response.ok) {
                cache.put(filePath, response);
              } else {
                console.error(`Error fetching ${filePath}: ${response.statusText}`);
              }
            })
            .catch((error) => {
              console.error(`Failed to fetch and cache: ${filePath}`, error);
            });
        });
        alert('Carpeta subida a la cache!');
      });
    } else {
      alert('Por favor, selecciona una carpeta primero.');
    }
  };

  return (
    <div>
      <h1>Subir Archivos desde la Carpeta a Cache</h1>
      <button onClick={handleFolderChange}>Seleccionar Carpeta</button>
      <button onClick={handleUpload} disabled={files.length === 0}>
        Subir Carpeta a Cache
      </button>
    </div>
  );
}

export default CacheUploader;
