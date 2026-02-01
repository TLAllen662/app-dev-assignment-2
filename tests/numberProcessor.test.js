const {
  calculateSum,
  findHighest,
  findLowest,
  calculateAverage,
  processNumberFile
} = require('../src/numberProcessor');

describe('numberProcessor', () => {
  
  describe('calculateSum', () => {
    test('should calculate sum of positive numbers', () => {
      const numbers = [1, 2, 3, 4, 5];
      expect(calculateSum(numbers)).toBe(15);
    });

    test('should calculate sum with negative numbers', () => {
      const numbers = [10, -5, 3, -2, 8];
      expect(calculateSum(numbers)).toBe(14);
    });

    test('should calculate sum with decimal numbers', () => {
      const numbers = [1.5, 2.5, 3.0];
      expect(calculateSum(numbers)).toBe(7);
    });

    test('should return 0 for empty array', () => {
      expect(calculateSum([])).toBe(0);
    });

    test('should calculate sum of single number', () => {
      expect(calculateSum([42])).toBe(42);
    });

    test('should handle large numbers', () => {
      const numbers = [1000000, 2000000, 3000000];
      expect(calculateSum(numbers)).toBe(6000000);
    });

    test('should calculate sum with mixed positive and negative', () => {
      const numbers = [100, -50, 75, -25];
      expect(calculateSum(numbers)).toBe(100);
    });
  });

  describe('findHighest', () => {
    test('should find the highest number', () => {
      const numbers = [10, 25, 5, 30, 15];
      expect(findHighest(numbers)).toBe(30);
    });

    test('should find highest with negative numbers', () => {
      const numbers = [-10, -5, -20, -1];
      expect(findHighest(numbers)).toBe(-1);
    });

    test('should find highest with single number', () => {
      expect(findHighest([42])).toBe(42);
    });

    test('should return null for empty array', () => {
      expect(findHighest([])).toBeNull();
    });

    test('should find highest when all numbers are same', () => {
      const numbers = [5, 5, 5, 5];
      expect(findHighest(numbers)).toBe(5);
    });

    test('should find highest with decimal numbers', () => {
      const numbers = [1.5, 3.7, 2.2, 4.1];
      expect(findHighest(numbers)).toBe(4.1);
    });

    test('should find highest from sample data range', () => {
      const numbers = [73, 85, 96, 82, 79];
      expect(findHighest(numbers)).toBe(96);
    });
  });

  describe('findLowest', () => {
    test('should find the lowest number', () => {
      const numbers = [10, 25, 5, 30, 15];
      expect(findLowest(numbers)).toBe(5);
    });

    test('should find lowest with negative numbers', () => {
      const numbers = [-10, -5, -20, -1];
      expect(findLowest(numbers)).toBe(-20);
    });

    test('should find lowest with single number', () => {
      expect(findLowest([42])).toBe(42);
    });

    test('should return null for empty array', () => {
      expect(findLowest([])).toBeNull();
    });

    test('should find lowest when all numbers are same', () => {
      const numbers = [5, 5, 5, 5];
      expect(findLowest(numbers)).toBe(5);
    });

    test('should find lowest with decimal numbers', () => {
      const numbers = [1.5, 3.7, 2.2, 4.1];
      expect(findLowest(numbers)).toBe(1.5);
    });

    test('should find lowest from sample data range', () => {
      const numbers = [73, 85, 96, 82, 79];
      expect(findLowest(numbers)).toBe(73);
    });
  });

  describe('calculateAverage', () => {
    test('should calculate average of positive numbers', () => {
      const numbers = [10, 20, 30];
      expect(calculateAverage(numbers)).toBe(20);
    });

    test('should calculate average with decimal result', () => {
      const numbers = [1, 2, 3, 4];
      expect(calculateAverage(numbers)).toBe(2.5);
    });

    test('should calculate average with negative numbers', () => {
      const numbers = [-10, 0, 10];
      expect(calculateAverage(numbers)).toBe(0);
    });

    test('should return 0 for empty array', () => {
      expect(calculateAverage([])).toBe(0);
    });

    test('should calculate average of single number', () => {
      expect(calculateAverage([50])).toBe(50);
    });

    test('should calculate average with decimal numbers', () => {
      const numbers = [1.5, 2.5, 3.5];
      expect(calculateAverage(numbers)).toBe(2.5);
    });

    test('should calculate average matching sample data', () => {
      const numbers = [73, 85, 96, 82, 79];
      expect(calculateAverage(numbers)).toBe(83);
    });

    test('should calculate average with large numbers', () => {
      const numbers = [100, 200, 300];
      expect(calculateAverage(numbers)).toBe(200);
    });
  });

  describe('processNumberFile', () => {
    test('should process sample-numbers.txt file correctly', () => {
      const result = processNumberFile('./data/sample-numbers.txt');
      expect(result).toHaveProperty('sum');
      expect(result).toHaveProperty('highest');
      expect(result).toHaveProperty('lowest');
      expect(result).toHaveProperty('average');
      expect(result).toHaveProperty('count');
      expect(result.count).toBe(30);
      expect(result.sum).toBe(2597);
      expect(result.highest).toBe(96);
      expect(result.lowest).toBe(73);
      expect(result.average).toBeCloseTo(86.57, 1);
    });

    test('should return object with all required properties', () => {
      const result = processNumberFile('./data/sample-numbers.txt');
      expect(typeof result.sum).toBe('number');
      expect(typeof result.highest).toBe('number');
      expect(typeof result.lowest).toBe('number');
      expect(typeof result.average).toBe('number');
      expect(typeof result.count).toBe('number');
    });

    test('should have valid statistics relationships', () => {
      const result = processNumberFile('./data/sample-numbers.txt');
      expect(result.highest).toBeGreaterThanOrEqual(result.lowest);
      expect(result.average).toBeLessThanOrEqual(result.highest);
      expect(result.average).toBeGreaterThanOrEqual(result.lowest);
      expect(result.count).toBeGreaterThan(0);
    });

    test('should calculate average correctly from sum and count', () => {
      const result = processNumberFile('./data/sample-numbers.txt');
      const calculatedAverage = result.sum / result.count;
      expect(result.average).toBeCloseTo(calculatedAverage, 10);
    });
  });
});
