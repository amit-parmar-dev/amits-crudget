import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultVal) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultVal === "function") {
        return defaultVal()
    } else {
        return defaultVal
    }
  })  

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}