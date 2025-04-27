// useApi.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { get, post, put, del } from "@/utils/apiRequest";

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export default function useApi<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  dataRequest?: any
): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<boolean>(false);
  const { data: session } = useSession();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let response;
      switch (method) {
        case "GET":
          response = await get<T>(url);
          break;
        case "POST":
          response = await post<T>(url, dataRequest);
          break;
        case "PUT":
          response = await put<T>(url, dataRequest);
          break;
        case "DELETE":
          response = await del<T>(url);
          break;
      }
      setData(response.data);
      setError(null);
    } catch (e) {
      console.error("API Error:", e);
      setError((e as Error).message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [url, method, dataRequest]);

  useEffect(() => {
    fetchData();
  }, [fetchData, trigger]);

  const refetch = useCallback(() => {
    setTrigger((prev) => !prev);
  }, []);

  return { data, loading, error, refetch };
}
