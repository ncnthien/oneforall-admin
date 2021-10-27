import { useTimeout } from 'hooks'
import { useEffect } from 'react'

const useDebounce = (
  callback: () => void,
  delay: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: any[]
): void => {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])
  useEffect(() => {
    clear()
  }, [])
}

export default useDebounce
