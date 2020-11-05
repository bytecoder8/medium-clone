import { useEffect, useState } from "react"


type ReturnValue = [
  value: string,
  setValue: (value: string) => void
]

export function useLocalStorage(key: string, initialValue: string = ''): ReturnValue  {
  const [storedValue, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, storedValue)
  }, [key, storedValue])

  return([
    storedValue,
    setValue
  ])
}
