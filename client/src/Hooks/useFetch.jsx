import { useState, useEffect } from "react";

const useFetch = (URL) => {

    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortcont = new AbortController();

        fetch(URL, { signal: abortcont.signal })

            .then(res => {
                if (!res.ok) {
                    throw Error("Could not get data");
                }
                return res.json();
            })

            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })

            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch Aborted');
                }
                else {
                    setError(err.message);
                    setIsPending(false);
                }
            })
        return () => abortcont.abort();

    }, [URL]);

    return { data, isPending, error };
}

export default useFetch;