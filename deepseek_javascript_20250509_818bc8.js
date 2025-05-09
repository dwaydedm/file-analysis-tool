const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { Transformers } = require('@huggingface/transformers');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Initialize AI model
const model = new Transformers('bert-base-uncased');

// API Endpoints
app.post('/api/analyze', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const analysis = await analyzeFile(filePath);
        res.json(analysis);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

async function analyzeFile(filePath) {
    // 1. Basic file info
    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 2. Detect secrets/credentials
    const secrets = detectSecrets(content);
    
    // 3. Analyze with AI
    const aiAnalysis = await model.analyze(content);
    
    // 4. Check for hidden files (Unix/Mac)
    let hiddenFiles = [];
    if (process.platform !== 'win32') {
        hiddenFiles = execSync('find . -name ".*"').toString().split('\n');
    }
    
    return {
        filename: path.basename(filePath),
        size: stats.size,
        type: path.extname(filePath),
        modified: stats.mtime,
        secrets,
        aiAnalysis,
        hiddenFiles: hiddenFiles.filter(f => f)
    };
}

function detectSecrets(content) {
    // Regex patterns for common credentials
    const patterns = {
        apiKeys: /(api|key|token|secret)[_\-]?key["']?\s*[:=]\s*["'][a-z0-9]{20,}["']/gi,
        passwords: /(password|passwd|pwd)[:=]\s*["'].+["']/gi,
        awsKeys: /AKIA[0-9A-Z]{16}/g,
        crypto: /(BEGIN (RSA|OPENSSH|PGP) PRIVATE KEY)/g
    };
    
    const results = {};
    for (const [type, pattern] of Object.entries(patterns)) {
        const matches = content.match(pattern) || [];
        if (matches.length) results[type] = matches;
    }
    return results;
}

app.listen(3000, () => console.log('Server running on port 3000'));