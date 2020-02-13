const AppInsights = new Proxy({}, {
    get: () => () => { },
});

export default AppInsights