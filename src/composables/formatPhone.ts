export function formatPhone(phone: string) {
  return phone.replace(/(\d{4})(\d{4})/, '$1-$2')
}
