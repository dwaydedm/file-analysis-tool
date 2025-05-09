import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>File Analysis Tool</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" disabled={!file || isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze File'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {analysis && (
          <div className="results">
            <h2>Analysis Results</h2>
            <div className="file-info">
              <h3>File Information</h3>
              <p>Name: {analysis.filename}</p>
              <p>Size: {analysis.fileInfo?.size} bytes</p>
              <p>Type: {analysis.fileInfo?.type}</p>
            </div>

            <div className="detailed-analysis">
              <h3>Detailed Analysis</h3>
              <pre>{JSON.stringify(analysis, null, 2)}</pre>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
