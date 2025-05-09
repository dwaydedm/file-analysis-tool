
Built by https://www.blackbox.ai

---

# File Analysis Tool

## Project Overview
The **File Analysis Tool** is a desktop application designed to provide comprehensive analysis of various file types using advanced AI models. This tool uses **Electron** for desktop application framework, **Express** for handling API requests, and **React** for the frontend user interface. It integrates AI technologies to analyze files for sensitive information, technical details, and underlying content.

## Installation

To set up the project locally, ensure you have [Node.js](https://nodejs.org/) installed. Follow the steps below to install dependencies and run the application:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd file-analysis-tool
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set your OpenAI API key in your environment variables:
   ```bash
   export OPENAI_KEY='your-openai-api-key'
   ```

4. Run the application in development mode:
   ```bash
   npm run dev
   ```

This will start both the Express server and the React frontend.

## Usage

1. Launch the application. It will open a window where you can upload a file for analysis.
2. Click the "Upload File" button and select the file you wish to analyze.
3. The tool will process the file and display analysis results including:
   - Detected secrets
   - AI-generated interpretations
   - File metadata

## Features
- **File Upload**: Easily upload files of different types (text, code, images).
- **Sensitive Data Detection**: Automatically detect potential secrets in the file content.
- **AI Analysis**: Utilize AI models to analyze and summarize file content.
- **Browser-based Interface**: Built with React for an engaging user experience.
- **Desktop Application**: Leveraging Electron for cross-platform desktop capabilities.

## Dependencies

The application relies on the following dependencies (as specified in `package.json`):
- `electron`: ^28.0.0
- `express`: ^4.18.2
- `multer`: ^1.4.5-lts.1
- `@huggingface/transformers`: ^2.4.0
- `openai`: ^4.0.0
- `concurrently`: ^8.2.2 (dev dependency for running both server and client)

## Project Structure

The project has the following structure:

```
file-analysis-tool/
├── client/                          # Contains the React frontend code
├── uploads/                         # Directory for uploaded files
├── package.json                     # Project metadata and dependencies
├── main.js                          # Electron main process
├── server.js                        # Express server setup
├── deepseek_javascript_20250509_54d56b.js    # AI content analysis file
├── deepseek_javascript_20250509_efc032.js     # Electron main window handling
├── deepseek_javascript_20250509_f4ec73.js      # React UI component for file upload
├── analysis.js                      # Logic for file analysis
├── README.md                        # Project documentation
```

## Contributing

Contributions to the project are welcome! Please submit a pull request or open an issue if you have suggestions or improvements.

## License

This project is licensed under the MIT License. See `LICENSE` for details.