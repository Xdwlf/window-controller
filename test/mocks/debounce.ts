
// lodash's debounce results in infinite recursion error
// https://github.com/facebook/jest/issues/3465

export const debounce = jest.fn<any, any>().mockImplementation((callback, timeout) => {
    let timeoutId: number | undefined = undefined;
    const debounced = jest.fn(() => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(callback, timeout);
    });

    return debounced;
});

export default debounce;