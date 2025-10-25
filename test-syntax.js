// Test file to find syntax error
try {
    const topicosData = require('./topicos-data.js');
    console.log('File loaded successfully!');
    console.log('Number of topics:', Object.keys(topicosData).length);
} catch (error) {
    console.error('Error loading file:', error.message);
    console.error('Stack:', error.stack);
}
