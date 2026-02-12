
import { useState, useEffect, useCallback, useRef } from "react";

export default function useFetch(
  url,
  {
    method = "GET",
    body = null,
    headers = {},
    limit = 10,
    cursor = null,
    page = null,
    search = "",
    auto = true,
    id = null,
  } = {}
) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const hasFetched = useRef(false); // StrictMode safe

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query parameters only for GET requests
      const params = new URLSearchParams();
      if (method === "GET") {
        if (cursor) params.append("cursor", cursor);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (search) params.append("search", search);
        if (id) params.append("id", id);
      }

      // Build fetch options
      const options = {
        method,
        headers: { ...headers },
      };

      if (token) options.headers["token"] = token;

      if (method !== "GET" && body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
      }

      // Fetch URL
      const finalUrl = method === "GET" ? `${url}?${params.toString()}` : url;
      const res = await fetch(finalUrl, options);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Fetch failed: ${res.status} ${res.statusText} - ${errorText}`);
      }

      const result = await res.json();
      setData(result.data ?? result);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [url, method, body, headers, limit, cursor, page, search, id, token]);

  // Auto-fetch on mount or when dependencies change
  useEffect(() => {
    if (auto && !hasFetched.current) {
      fetchData();
      hasFetched.current = true;
    }
  }, [auto, fetchData]);

  // Auto-fetch when pagination/search params change (optional)
  useEffect(() => {
    if (auto && hasFetched.current) {
      fetchData();
    }
  }, [page, cursor, search, fetchData, auto]);

  return { data, loading, error, refetch: fetchData };
}
