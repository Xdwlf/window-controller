import '@testing-library/jest-dom/extend-expect'

const originalError = console.error;

console.error = (first: any, ...errors: any[]): void => {
    if (typeof first === 'string') {
        if (~first.indexOf('Material-UI: the contrast ratio')) {
            return;
        }
    }
    originalError(first, ...errors);
}