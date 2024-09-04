import React, { useState } from 'react';

const FormUploader = () => {
  const [formFile, setFormFile] = useState(null);
  const [modelFile, setModelFile] = useState(null);

  const handleFormChange = (event) => {
    setFormFile(event.target.files[0]);
  };

  const handleModelChange = (event) => {
    setModelFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!formFile || !modelFile) {
      alert("Por favor selecciona ambos archivos");
      return;
    }

    // Leer los archivos seleccionados y almacenarlos en IndexedDB
    Promise.all([
      readFileContent(formFile),
      readFileContent(modelFile)
    ])
    .then(([formContent, modelContent]) => {
      // Limpiar los contenidos de los archivos
      const cleanFormString = cleanString(formContent);
      const cleanModelString = cleanString(modelContent);

      // Almacenar en IndexedDB
      storeInIndexedDB(cleanFormString, cleanModelString);
    })
    .catch(error => console.error('Error al cargar los archivos:', error));
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  function cleanString(input) {
    // Eliminar caracteres de escape adicionales
    return input.replace(/\\\\/g, '\\')
                .replace(/\\\"/g, '"')
                .replace(/\\n/g, '\n')
                .replace(/\\t/g, '\t');
  }

  function storeInIndexedDB(formString, modelString) {
    const request = indexedDB.open('enketo', 4);

    request.onupgradeneeded = function(event) {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('surveys')) {
        const surveysStore = db.createObjectStore('surveys', { keyPath: 'enketoId' });
        surveysStore.createIndex('enketoId', 'enketoId', { unique: true });
      }
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction('surveys', 'readwrite');
      const store = transaction.objectStore('surveys');

      const survey = {
        form: formString,
        enketoId: 'TwrsDY99',
        model: modelString,
        hash: 'md5:10eb5501a1cda4ff85022fcd31acd51c--7249d3de7986e03785f084296e62ab0e---1',
        languageMap: {},
        maxSize: 10000000,
        media: {}
      };

      const storeRequest = store.put(survey);

      storeRequest.onsuccess = function() {
        console.log('Formulario y modelo almacenados en IndexedDB correctamente');
      };

      storeRequest.onerror = function(event) {
        console.error('Error al almacenar el formulario en IndexedDB:', event.target.error);
      };
    };

    request.onerror = function(event) {
      console.error('Error al abrir la base de datos IndexedDB:', event.target.error);
    };
  }

  return (
    <div>
      <input type="file" accept=".xml" onChange={handleFormChange} />
      <input type="file" accept=".xml" onChange={handleModelChange} />
      <button onClick={handleUpload}>Subir Form y Model a IndexDB</button>
    </div>
  );
};

export default FormUploader;