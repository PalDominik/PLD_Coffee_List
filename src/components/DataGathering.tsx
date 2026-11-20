import { useState,  useCallback } from "react";
import type { Coffee } from "../Types/Type";

const url = "http://localhost:3000/Coffees";

export async function fetchData<T>(options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export default function useFetch(options: RequestInit = {}) {
  const [data, setData] = useState<Coffee[] | null>(null);
 

  const load = useCallback(async () => {
    
    try {
      const result = await fetchData<Coffee[]>({ ...options});
      setData(result);
    } catch (err) {
      console.log("baj van: " + err)
      
    } ;
    
  }, []);



  return { data, refetch: () => load() };
}