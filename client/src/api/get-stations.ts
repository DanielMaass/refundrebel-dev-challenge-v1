export async function getStations(name: string) {
  const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/stations/${name}`)
  return resp.json()
}
