import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    const [isLoading, setLoading] = useState(false);

    const [error, setError] = useState();

    const activeHttpRequest = useRef([]);

    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, 
            headers = {
            'Content-Type': 'application/json'
            }) => {
            setLoading(true);
            const httpAbortCtrl = new AbortController();
            activeHttpRequest.current.push(httpAbortCtrl);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal   
                }
                );

                activeHttpRequest.current = activeHttpRequest.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

                const responseData = await response.json();
                //response.ok will only accept if status 200 throw to catch block
                if (!response.ok) {
                    throw new Error(responseData.message)
                }

                setLoading(false);
                return responseData;

            } catch (err) {
                setError(err.message);
                setLoading(false);
                throw err;
            }

        }, []);
    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort());
        }
    }, [])

    return { isLoading: isLoading, error, sendRequest, clearError }
}