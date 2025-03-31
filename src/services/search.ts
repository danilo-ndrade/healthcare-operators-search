export async function searchOperators(
  searchTerm: string,
  filters: { ans_number?: boolean; cnpj?: boolean; company_name?: boolean },
) {
  const baseUrl = 'http://127.0.0.1:8000/api/busca-operadores'
  const params = new URLSearchParams()

  params.append('busca', searchTerm)

  if (filters.company_name) {
    params.append('razao_social', 'true')
  }
  if (filters.cnpj) {
    params.append('cnpj', 'true')
  }
  if (filters.ans_number) {
    params.append('numero_ans', 'true')
  }

  try {
    const res = await fetch(`${baseUrl}?${params.toString()}`)
    if (!res.ok) {
      throw new Error(`Erro ao buscar operadores: ${res.status} - ${res.statusText}`)
    }
    return await res.json()
  } catch (error) {
    console.error('Erro na requisição:', error)
    throw 'Erro ao fazer requisição: ' + error
  }
}
