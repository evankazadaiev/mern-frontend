import React, { useRef, useEffect } from 'react';

export const usePreviousId = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    })
    return ref.current;
};