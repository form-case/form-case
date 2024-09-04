import logo from './logo.svg';
import './App.css';
import FormUploader from './components/FormUploader';
import FolderUploader from './components/FolderUploader';
import HtmlUploader from './components/HtmlUploader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Subida de Form y Model a IndexDB</h1>
        <FormUploader />
        <h1>Aplicación de Subida de Archivos</h1>
        <FolderUploader />
        <h1>Aplicación de Subida de Html</h1>
        <HtmlUploader />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
