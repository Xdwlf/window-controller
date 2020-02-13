const FetchAdapter = {
    call: jest.fn(() => Promise.resolve({ data: {} })),
    subscribe: jest.fn(),
    unSubscribe: jest.fn(),
};

export default FetchAdapter;