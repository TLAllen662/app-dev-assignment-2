const {
  countWords,
  findLongestWord,
  countLines,
  analyzeTextFile
} = require('../src/textAnalyzer');

describe('textAnalyzer', () => {
  
  describe('countWords', () => {
    test('should count words correctly in a simple sentence', () => {
      const text = 'Hello world this is a test';
      expect(countWords(text)).toBe(6);
    });

    test('should count words with multiple spaces', () => {
      const text = 'Hello    world    test';
      expect(countWords(text)).toBe(3);
    });

    test('should count words with tabs and newlines', () => {
      const text = 'Hello\tworld\ntest\rstring';
      expect(countWords(text)).toBe(4);
    });

    test('should return 0 for empty string', () => {
      expect(countWords('')).toBe(0);
    });

    test('should return 0 for whitespace only', () => {
      expect(countWords('   \t\n  ')).toBe(0);
    });

    test('should count words in a paragraph', () => {
      const text = 'The best time to plant a tree was twenty years ago. The second best time is now.';
      expect(countWords(text)).toBe(17);
    });

    test('should handle punctuation attached to words', () => {
      const text = 'Hello, world! How are you?';
      expect(countWords(text)).toBe(5);
    });
  });

  describe('findLongestWord', () => {
    test('should find the longest word in a sentence', () => {
      const text = 'The quick brown fox';
      expect(findLongestWord(text)).toBe('quick');
    });

    test('should return the longest word when multiple exist', () => {
      const text = 'cat dog elephant bird';
      expect(findLongestWord(text)).toBe('elephant');
    });

    test('should handle punctuation on longest word', () => {
      const text = 'short verylong. tiny';
      expect(findLongestWord(text)).toBe('verylong.');
    });

    test('should return empty string for empty text', () => {
      expect(findLongestWord('')).toBe('');
    });

    test('should return empty string for whitespace only', () => {
      expect(findLongestWord('   \t\n  ')).toBe('');
    });

    test('should find longest word with multiple spaces', () => {
      const text = 'cat    elephant    dog';
      expect(findLongestWord(text)).toBe('elephant');
    });

    test('should handle single word', () => {
      const text = 'sophistication';
      expect(findLongestWord(text)).toBe('sophistication');
    });

    test('should find longest word from a quote', () => {
      const text = 'First solve the problem then write the code';
      expect(findLongestWord(text)).toBe('problem');
    });
  });

  describe('countLines', () => {
    test('should count single line', () => {
      const text = 'This is a single line';
      expect(countLines(text)).toBe(1);
    });

    test('should count multiple lines', () => {
      const text = 'Line one\nLine two\nLine three';
      expect(countLines(text)).toBe(3);
    });

    test('should return 0 for empty string', () => {
      expect(countLines('')).toBe(0);
    });

    test('should count lines with empty lines', () => {
      const text = 'Line one\n\nLine three';
      expect(countLines(text)).toBe(3);
    });

    test('should count lines with trailing newline', () => {
      const text = 'Line one\nLine two\n';
      expect(countLines(text)).toBe(3);
    });

    test('should count multiple empty lines', () => {
      const text = '\n\n\n';
      expect(countLines(text)).toBe(4);
    });

    test('should count 10 lines from quotes', () => {
      const text = 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8\nLine 9\nLine 10';
      expect(countLines(text)).toBe(10);
    });
  });

  describe('analyzeTextFile', () => {
    test('should analyze quotes.txt file correctly', () => {
      const result = analyzeTextFile('./data/quotes.txt');
      expect(result).toHaveProperty('wordCount');
      expect(result).toHaveProperty('longestWord');
      expect(result).toHaveProperty('lineCount');
      expect(result.wordCount).toBeGreaterThan(0);
      expect(result.longestWord).toBeTruthy();
      expect(result.lineCount).toBe(10);
    });

    test('should analyze sample-text.txt file correctly', () => {
      const result = analyzeTextFile('./data/sample-text.txt');
      expect(result).toHaveProperty('wordCount');
      expect(result).toHaveProperty('longestWord');
      expect(result).toHaveProperty('lineCount');
      expect(result.wordCount).toBe(207);
      expect(result.longestWord).toBeTruthy();
      expect(result.lineCount).toBe(1);
    });

    test('should return object with all required properties', () => {
      const result = analyzeTextFile('./data/quotes.txt');
      expect(typeof result.wordCount).toBe('number');
      expect(typeof result.longestWord).toBe('string');
      expect(typeof result.lineCount).toBe('number');
    });
  });
});
