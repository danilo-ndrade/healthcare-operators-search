export function formatCEP(cep: string) {
  // 99999-999
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
}
