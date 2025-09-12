export async function getTrainConnections(id: string, duration?: number) {
  const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/train-connections/${id}/${duration}`)
  return resp.json()
}
