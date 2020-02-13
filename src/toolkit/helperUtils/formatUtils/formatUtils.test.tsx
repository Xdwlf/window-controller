import { formatMoney, formatName } from './index';

describe('formatMoney', () => {
    test('formats numbers to money correctly', () => {
        expect(formatMoney(1234)).toBe('1,234');
        expect(formatMoney(123456)).toBe('123,456');
    });
    test('handles decimals', () => {
        expect(formatMoney(9000342.12321)).toBe('9,000,342.12');
        expect(formatMoney(1235.1)).toBe('1,235.1');
    });
});
describe('formatName helper', () => {
    test('formatName should format a first and last name', () => {
        expect(formatName('joe', 'blow')).toBe('joe blow');
        expect(formatName('joe', undefined)).toBe('joe');
        expect(formatName(undefined, 'blow')).toBe('blow');
    });
    test('formatName should format use default text passed in', () => {
        expect(formatName(undefined, undefined, 'no name')).toBe('no name');
        expect(formatName(undefined, undefined)).toBe('Name Not Found');
    });
    test('formatName should format use default text', () => {
        expect(formatName(undefined, undefined)).toBe('Name Not Found');
        expect(formatName(undefined, 'hello')).toBe('hello');
    });
});
