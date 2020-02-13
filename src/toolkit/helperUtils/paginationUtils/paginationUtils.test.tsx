import { calcCurrentPage, hasMoreItems } from '.';

describe('calcCurrentPage', () => {
    test('calculates the current page correctly based on items in list and items per page', () => {
        expect(calcCurrentPage(5, 5)).toBe(1);
        expect(calcCurrentPage(10, 5)).toBe(2);
        expect(calcCurrentPage(11, 5)).toBe(3);
        expect(calcCurrentPage(100, 1)).toBe(100);
    });
});

describe('hasMoreItems', () => {
    test('calculates if there are more items', () => {
        expect(hasMoreItems(5, 5, 10)).toBe(true);
        expect(hasMoreItems(1, 1, 10)).toBe(true);
        expect(hasMoreItems(1, 1, 1)).toBe(false);
        expect(hasMoreItems(23, 5, 5)).toBe(false);
    });
});
