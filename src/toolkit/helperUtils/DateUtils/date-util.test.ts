import { minutesToMs, diffTimes } from './index';

describe('dateTimeUtils', () => {
    test('minutesToMs should convert minutes to ms', () => {
        expect(minutesToMs(20)).toBe(1200000);
        expect(minutesToMs(5)).toBe(300000);
        expect(minutesToMs(0.04)).toBe(2400);
    });
    test('minutesToMs should convert minutes to ms', () => {
        expect(minutesToMs(20)).toBe(1200000);
        expect(minutesToMs(5)).toBe(300000);
        expect(minutesToMs(0.04)).toBe(2400);
    });
    test('minutesToMs should convert minutes decimal to ms', () => {
        expect(minutesToMs(10.5)).toBe(630000);
        expect(minutesToMs(5.05)).toBe(303000);
    });
    test('diffTimes should return the difference between numbers', () => {
        expect(diffTimes(20, 20)).toBe(0);
        expect(diffTimes(20, 100)).toBe(80);
        expect(diffTimes(100, 20)).toBe(80);
    });
    test('diffTimes should return the difference between dates', () => {
        const now = new Date();
        const twentyMinutesAgo = new Date(Date.now() - minutesToMs(20));
        expect(diffTimes(now, twentyMinutesAgo)).toBe(minutesToMs(20));
    });
    test('diffTimes should return the difference between dates and numbers', () => {
        const now = new Date();
        const twentyMinutesAgo = Date.now() - minutesToMs(20);
        expect(diffTimes(now, twentyMinutesAgo)).toBe(minutesToMs(20));
    });
});
