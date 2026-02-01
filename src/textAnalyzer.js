const fs = require('fs');

/**
 * Reads a text file and returns its content
 * @param {string} filePath - Path to the text file
 * @returns {string} The content of the file
 */
function readTextFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Counts the total number of words in the given text
 * @param {string} text - The text to analyze
 * @returns {number} The total number of words
 */
function countWords(text) {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

/**
 * Finds the longest word in the given text
 * @param {string} text - The text to analyze
 * @returns {string} The longest word
 */
function findLongestWord(text) {
  const words = text.split(/\s+/).filter(word => word.length > 0);
  if (words.length === 0) return '';
  
  return words.reduce((longest, current) => 
    current.length > longest.length ? current : longest
  );
}

/**
 * Counts the total number of lines in the given text
 * @param {string} text - The text to analyze
 * @returns {number} The number of lines
 */
function countLines(text) {
  if (text.length === 0) return 0;
  return text.split('\n').length;
}

/**
 * Analyzes a text file and returns statistics
 * @param {string} filePath - Path to the text file
 * @returns {object} Object containing word count, longest word, and line count
 */
function analyzeTextFile(filePath) {
  const text = readTextFile(filePath);
  
  return {
    wordCount: countWords(text),
    longestWord: findLongestWord(text),
    lineCount: countLines(text)
  };
}

module.exports = {
  readTextFile,
  countWords,
  findLongestWord,
  countLines,
  analyzeTextFile
};

// Verification: Test the functions with sample data
if (require.main === module) {
  console.log('=== Testing textAnalyzer.js ===\n');

  // Test with quotes.txt
  console.log('--- Analyzing data/quotes.txt ---');
  try {
    const quotesAnalysis = analyzeTextFile('./data/quotes.txt');
    console.log(`Word Count: ${quotesAnalysis.wordCount}`);
    console.log(`Longest Word: "${quotesAnalysis.longestWord}"`);
    console.log(`Line Count: ${quotesAnalysis.lineCount}`);
  } catch (error) {
    console.error('Error analyzing quotes.txt:', error.message);
  }

  console.log('\n--- Analyzing data/sample-text.txt ---');
  // Test with sample-text.txt
  try {
    const sampleAnalysis = analyzeTextFile('./data/sample-text.txt');
    console.log(`Word Count: ${sampleAnalysis.wordCount}`);
    console.log(`Longest Word: "${sampleAnalysis.longestWord}"`);
    console.log(`Line Count: ${sampleAnalysis.lineCount}`);
  } catch (error) {
    console.error('Error analyzing sample-text.txt:', error.message);
  }
}
