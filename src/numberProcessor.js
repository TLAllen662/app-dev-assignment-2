const fs = require('fs');

/**
 * Reads a file containing numbers (one per line) and returns an array of numbers
 * @param {string} filePath - Path to the file containing numbers
 * @returns {number[]} Array of numbers
 */
function readNumbers(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content
    .trim()
    .split('\n')
    .map(line => parseFloat(line))
    .filter(num => !isNaN(num));
}

/**
 * Calculates the sum of all numbers in the array
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The sum of all numbers
 */
function calculateSum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

/**
 * Finds the highest number in the array
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The highest number
 */
function findHighest(numbers) {
  if (numbers.length === 0) return null;
  return Math.max(...numbers);
}

/**
 * Finds the lowest number in the array
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The lowest number
 */
function findLowest(numbers) {
  if (numbers.length === 0) return null;
  return Math.min(...numbers);
}

/**
 * Calculates the average of all numbers in the array
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The average of all numbers
 */
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  return calculateSum(numbers) / numbers.length;
}

/**
 * Processes a number file and returns statistics
 * @param {string} filePath - Path to the file containing numbers
 * @returns {object} Object containing sum, highest, lowest, and average
 */
function processNumberFile(filePath) {
  const numbers = readNumbers(filePath);
  
  return {
    sum: calculateSum(numbers),
    highest: findHighest(numbers),
    lowest: findLowest(numbers),
    average: calculateAverage(numbers),
    count: numbers.length
  };
}

module.exports = {
  readNumbers,
  calculateSum,
  findHighest,
  findLowest,
  calculateAverage,
  processNumberFile
};

// Verification: Test the functions with sample data
if (require.main === module) {
  console.log('=== Testing numberProcessor.js ===\n');

  // Test with sample-numbers.txt
  console.log('--- Analyzing data/sample-numbers.txt ---');
  try {
    const numbersAnalysis = processNumberFile('./data/sample-numbers.txt');
    console.log(`Count: ${numbersAnalysis.count}`);
    console.log(`Sum: ${numbersAnalysis.sum}`);
    console.log(`Highest: ${numbersAnalysis.highest}`);
    console.log(`Lowest: ${numbersAnalysis.lowest}`);
    console.log(`Average: ${numbersAnalysis.average.toFixed(2)}`);
  } catch (error) {
    console.error('Error analyzing sample-numbers.txt:', error.message);
  }
}
