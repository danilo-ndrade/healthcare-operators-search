export async function searchOperators($searchTerm: string) {
  const res = await fetch(`http://127.0.0.1:8000/api/busca-operadores?busca=${$searchTerm}`)
  if (!res.ok) {
    throw new Error('Erro ao buscar operadores')
  } else {
    return res.json()s
  }
}
