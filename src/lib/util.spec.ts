import { describe, expect, it } from 'vitest';
import { toTitleCase } from './util';

describe('toTitleCase', () => {
	it('should convert a single word to title case', () => {
		expect(toTitleCase('hello')).toBe('Hello');
	});

	it('should convert multiple words to title case', () => {
		expect(toTitleCase('hello world')).toBe('Hello World');
	});

	it('should handle empty string', () => {
		expect(toTitleCase('')).toBe('');
	});

	it('should handle strings with numbers', () => {
		expect(toTitleCase('hello world 123')).toBe('Hello World 123');
	});

	it('should handle strings with special characters', () => {
		expect(toTitleCase('hello-world')).toBe('Hello World');
	});

	it('should handle strings with multiple spaces', () => {
		expect(toTitleCase('hello   world')).toBe('Hello World');
	});
});
