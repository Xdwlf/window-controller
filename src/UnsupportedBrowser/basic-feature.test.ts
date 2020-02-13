import { isSupported, camelCase, capitalizeFirstLetter } from './feature-detect';

jest.mock('./basic-features.txt', () => {
    const features = `
    es.array.concat
    es.array.every
    es.string.trim`;
    return features;
});

describe('featureDetect', () => {
    test('isSupported', () => {
        expect(isSupported()).toBe(true);
    });
    test('capitalizeFirstLetter', () => {
        expect(capitalizeFirstLetter('number')).toBe('Number');
        expect(capitalizeFirstLetter('object')).toBe('Object');
        expect(capitalizeFirstLetter('string')).toBe('String');
    });
    test('camelCase', () => {
        expect(camelCase('hello-world')).toBe('helloWorld');
        expect(camelCase('hello-world-this')).toBe('helloWorldThis');
        expect(camelCase('hello')).toBe('hello');
    });
});
