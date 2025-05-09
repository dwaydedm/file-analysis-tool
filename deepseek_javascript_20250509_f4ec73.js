import React, { useState } from 'react';
import { Box, Button, Container, Paper, Typography, List, ListItem, Chip } from '@mui/material';
import { FileUpload } from '@mui/icons-material';

function App() {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const response = await fetch('http://localhost:3000/api/analyze', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setAnalysis(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h3" gutterBottom>
                    File Analysis AI
                </Typography>
                
                <input
                    accept="*/*"
                    style={{ display: 'none' }}
                    id="file-upload"
                    type="file"
                    onChange={handleFileUpload}
                />
                <label htmlFor="file-upload">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<FileUpload />}
                        disabled={loading}
                    >
                        {loading ? 'Analyzing...' : 'Upload File'}
                    </Button>
                </label>
                
                {analysis && (
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                        <Typography variant="h5">Analysis Results</Typography>
                        <Typography variant="subtitle1">File: {analysis.filename}</Typography>
                        
                        <Box mt={2}>
                            <Typography variant="h6">Secrets Found:</Typography>
                            {Object.keys(analysis.secrets).length > 0 ? (
                                <List>
                                    {Object.entries(analysis.secrets).map(([type, matches]) => (
                                        <ListItem key={type}>
                                            <Chip label={type} color="secondary" />
                                            {matches.join(', ')}
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography>No sensitive data detected</Typography>
                            )}
                        </Box>
                        
                        <Box mt={2}>
                            <Typography variant="h6">AI Interpretation:</Typography>
                            <Typography>{analysis.aiAnalysis.summary}</Typography>
                        </Box>
                        
                        {analysis.hiddenFiles.length > 0 && (
                            <Box mt={2}>
                                <Typography variant="h6">Hidden Files Detected:</Typography>
                                <List>
                                    {analysis.hiddenFiles.map((file, i) => (
                                        <ListItem key={i}>{file}</ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Paper>
                )}
            </Box>
        </Container>
    );
}

export default App;