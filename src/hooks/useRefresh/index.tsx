import React, { useState, useEffect, useRef } from 'react';

type Refresh = [string, () => void]

const useRefresh = (): Refresh => {
    const createNewKey = (): string => Math.random().toString();
    const [key, setKey] = useState(createNewKey());
    const toggleRefresh = (): void => {
        setKey(createNewKey());
    };
    return [key, toggleRefresh];
};

export default useRefresh;
