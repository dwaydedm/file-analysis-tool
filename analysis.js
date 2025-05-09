const fs = require('fs');
const path = require('path');
const { Transformers } = require('@huggingface/transformers');
const { OpenAI } = require('openai');

class FileAnalyzer {
  constructor() {
    this.transformers = new Transformers();
    this.openai = new OpenAI(process.env.OPENAI_API_KEY);
  }

  async analyze(filePath) {
    const fileType = this.getFileType(filePath);
    const content = this.readFileContent(filePath);
    
    let analysis = {};
    
    // Basic file info
    analysis.fileInfo = {
      path: filePath,
      type: fileType,
      size: fs.statSync(filePath).size,
      lastModified: fs.statSync(filePath).mtime
    };

    // Content analysis based on file type
    switch(fileType) {
      case 'text':
        analysis.textAnalysis = await this.analyzeText(content);
        break;
      case 'code':
        analysis.codeAnalysis = await this.analyzeCode(content);
        break;
      case 'image':
        analysis.imageAnalysis = await this.analyzeImage(filePath);
        break;
      default:
        analysis.content = 'Unsupported file type for deep analysis';
    }

    return analysis;
  }

  getFileType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const textExtensions = ['.txt', '.md', '.csv', '.json', '.xml'];
    const codeExtensions = ['.js', '.ts', '.py', '.java', '.c', '.cpp', '.html', '.css'];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    if (textExtensions.includes(ext)) return 'text';
    if (codeExtensions.includes(ext)) return 'code';
    if (imageExtensions.includes(ext)) return 'image';
    return 'unknown';
  }

  readFileContent(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return '';
    }
  }

  async analyzeText(content) {
    // Use HuggingFace transformers for NLP analysis
    const nlpResults = await this.transformers.process(content);
    
    // Use OpenAI for summarization and insights
    const summary = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Summarize and analyze this text:\n\n${content}`,
      max_tokens: 200
    });

    return {
      nlp: nlpResults,
      summary: summary.data.choices[0].text.trim()
    };
  }

  async analyzeCode(content) {
    // Use OpenAI for code analysis
    const analysis = await this.openai.createCompletion({
      model: 'code-davinci-002',
      prompt: `Analyze this code and provide insights:\n\n${content}`,
      max_tokens: 300
    });

    return {
      analysis: analysis.data.choices[0].text.trim()
    };
  }

  async analyzeImage(filePath) {
    // Placeholder for image analysis
    return {
      analysis: 'Image analysis would be implemented here'
    };
  }
}

module.exports = FileAnalyzer;
