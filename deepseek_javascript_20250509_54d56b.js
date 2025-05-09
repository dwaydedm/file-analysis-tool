async function enhancedAnalysis(content) {
    // Enhanced analysis with multiple AI models
    const results = {
        technical: await analyzeTechnicalContent(content),
        security: await analyzeSecurityRisks(content),
        business: await analyzeBusinessImpact(content)
    };
    
    return {
        summary: generateSummary(results),
        details: results
    };
}

async function analyzeTechnicalContent(text) {
    // Use a technical documentation model
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_KEY}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: `Explain the technical aspects of this code:\n\n${text}\n\nTechnical explanation:`,
            temperature: 0.7,
            max_tokens: 256
        })
    });
    const data = await response.json();
    return data.choices[0].text.trim();
}