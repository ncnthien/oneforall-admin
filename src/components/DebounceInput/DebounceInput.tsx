import { DebounceInputProps } from 'components/DebounceInput/interface'
import { useEffect, useState } from 'react'

const DebounceInput: React.FC<DebounceInputProps> = ({
  time,
  handleOnChangeProps,
  placeholder,
}) => {
  const defaultPlaceholder = 'Type something...'
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    const debounceId = setTimeout(() => {
      handleOnChangeProps()
    }, time)

    return () => {
      clearTimeout(debounceId)
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <input
      type='text'
      className='rounded-md w-80 shadow-md px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400'
      placeholder={placeholder ? placeholder : defaultPlaceholder}
      value={value}
      onChange={handleChange}
    />
  )
}

export default DebounceInput
