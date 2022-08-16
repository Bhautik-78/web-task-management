export const fetchAsJSON = async <T>(
  url: string,
  options: RequestInit | undefined
): Promise<T> => {
  const response = await fetch(url, options)
  const json = await response.json()
  return json
}
