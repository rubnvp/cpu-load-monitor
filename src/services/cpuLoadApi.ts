const BASE_URL = '/api'

export async function fetchCpuLoadAverage(): Promise<number> {
  const response = await fetch(`${BASE_URL}/cpu-load`)
  const { loadAverage } = await response.json()
  return loadAverage
}
