import { useEffect, useState } from 'react'

// // This version is from the ionic biorhythm calculator.
// export function useLocalStorage2(key, defaultValue){
//   function getInitialValue(){
//     //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
//     return localStorage.getItem(key) ?? defaultValue;
//   }

//   const [value, setValue] = useState(getInitialValue);

//   function setAndStoreValue(newValue){
//     setValue(newValue);
//     localStorage.setItem(key, newValue);
//   }

//   return [value, setAndStoreValue];
// }

/* =============================================================================
                            useLocalStorage()
============================================================================= */
// This version is from React/Resources/Videos/finished-products/codepen-like-editor-2021
// https://www.youtube.com/watch?v=wcVxX7lu2d4

/*

function useLocalStorage<T>(key: string, initialValue?: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)

    if (jsonValue !== null) {
      return JSON.parse(jsonValue)
    }

    if (typeof initialValue === 'function') {
      return (initialValue as Function)()
    }

    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

*/

function useLocalStorage<T>(
  key: string,
  initialValue?: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    // Initially this will be null.
    const jsonValue = localStorage.getItem(key)

    // If not null then return the parsed value.
    // Return it to where? To the 'value' identifier at the top of useLocalStorage.
    if (jsonValue !== null) {
      return JSON.parse(jsonValue) as T
    }

    // If jsonValue is null (i.e., no key yet exists) then either run
    // the function that returns the initialValue, or return the initialValue.
    if (typeof initialValue === 'function') {
      return (initialValue as () => T)()
    }

    return initialValue as T
  })

  // Any time value changes, automatically update storage.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export { useLocalStorage }
