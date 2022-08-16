import React from 'react'

export const useErrorState = (): {
  errorMessage: string
  setMessage: (message: string) => void
  fetchErrorMessage: () => string
} => {
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const setMessage = (message: string) => {
    setErrorMessage(message)
  }
  const fetchErrorMessage = () => {
    return errorMessage
  }
  return {
    errorMessage,
    setMessage,
    fetchErrorMessage,
  }
}
