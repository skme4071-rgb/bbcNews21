import { useCallback, useState } from "react";



export function useFetch(url) {
    const [state, setState] = useState({
        res: null,
        error: null,
        loading: false,
    });

    const fetchData = useCallback(
        async ({ method = "GET", body = null, params = {}, headers = {}, route = null } = {}) => {
            setState(v => ({ ...v, error: null, loading: true }));

            try {
                const query = new URLSearchParams(params).toString();

                const routeUrl = route ? `${url}/${route}` : url;
                const finalUrl = query ? `${url}?${query}` : routeUrl;
                // const finalUrl = query ? `${url}?${query}` : url;


                const isFormData = body instanceof FormData;

                const response = await fetch(finalUrl, {
                    method,
                    headers: {
                        ...headers,
                        // ❗ FormData হলে Content-Type দেবে না
                        ...(body && !isFormData && method !== "GET"
                            ? { "Content-Type": "application/json" }
                            : {}),
                    },
                    credentials: "include",
                    ...(body && method !== "GET" && {
                        body: isFormData ? body : JSON.stringify(body),
                    }),
                });

                const text = await response.text();
                const result = text ? JSON.parse(text) : null;

                // if (!response.ok) {
                //     const error = new Error(result?.message || "Request failed");
                //     error.status = response.status;
                //     throw error;

                // }

                setState(v => ({ ...v, res: result }));
                return result;

            } catch (error) {
                setState(v => ({ ...v, error }));
                throw error;
            } finally {
                setState(v => ({ ...v, loading: false }));
            }
        },
        [url]
    );

    return { ...state, refetch: fetchData };
}
