import { createClassString, cssBind } from './index';

describe('createClassString', () => {
    test('createClassString should create a string', () => {
        const className = createClassString('test');
        expect(className).toBe('test');
    });
    test('createClassString should create a string', () => {
        const className = createClassString('test', false, ' test-2 ');
        expect(className).toBe('test test-2');
    });
    test('createClassString should create a string with trimmed white space', () => {
        const className = createClassString('test', ' ', ' test-2 ', false, 'test-3');
        expect(className).toBe('test test-2 test-3');
    });
    test('createClassString should create a string should skip nulls', () => {
        const className = createClassString(false);
        expect(className).toBe('');
    });
    test('createClassString should create a string should allow one string to have many classnames', () => {
        const className = createClassString('class1 class2 class3 class4', 'class5');
        expect(className).toBe('class1 class2 class3 class4 class5');
    });
    test('createClassString should create a string should allow one string to have many classnames with no extra white space', () => {
        const className = createClassString('class1  class2  class3  class4', ' class5 ');
        expect(className).toBe('class1 class2 class3 class4 class5');
    });
    test('createClassString should work with undefined', () => {
        const className = createClassString('class1  class2', false, 'hello', undefined);
        expect(className).toBe('class1 class2 hello');
    });
});
describe('cssBind', () => {
    test('cssBind should return a function that can resolve css modules', () => {
        const test = {
            test: 'test-class',
            test2: 'test-class-2',
        };
        const css = cssBind(test);
        expect(css('test')).toBe('test-class');
    });
    test('cssBind should concat classnames together', () => {
        const test = {
            test: 'test-class',
            test2: 'test-class-2',
        };
        const css = cssBind(test);
        expect(css('test', 'test2')).toBe('test-class test-class-2');
    });
    test('cssBind should concat classnames together and global classnames', () => {
        const test = {
            test: 'test-class',
            test2: 'test-class-2',
        };
        const css = cssBind(test);
        expect(css('test', 'global')).toBe('test-class global');
    });
    test('cssBind should work with multiple classnames at once', () => {
        const test = {
            test: 'test-class',
            test2: 'test-class-2',
        };
        const css = cssBind(test);
        expect(css('test test2')).toBe('test-class test-class-2');
        expect(css('test global')).toBe('test-class global');
    });
});
