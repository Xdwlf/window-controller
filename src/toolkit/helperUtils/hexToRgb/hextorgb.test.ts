/* eslint-disable @typescript-eslint/unbound-method */
import { hexToRgb } from './index';

describe('hexToRgb', () => {
    test('hexToRgb should convert to an object of r g b', () => {
        const hex = hexToRgb('#eee');
        expect(hex).not.toBeNull();
        if (hex === null) return;
        expect(hex.r).toBe(238);
        expect(hex.g).toBe(238);
        expect(hex.b).toBe(238);
    });
    test('hexToRgb should convert to an object of r g b', () => {
        const hex = hexToRgb('#30B440');
        expect(hex).not.toBeNull();
        if (hex === null) return;
        expect(hex.r).toBe(48);
        expect(hex.g).toBe(180);
        expect(hex.b).toBe(64);
    });
    test('hexToRgb should convert log an error and return null', () => {
        const oldErr = console.error;
        console.error = jest.fn();
        expect(hexToRgb('#40')).toBeNull();
        expect(console.error).toHaveBeenCalledWith('You did not pass in a valid hex code to hexToRgb');
        console.error = oldErr;
    });
});
