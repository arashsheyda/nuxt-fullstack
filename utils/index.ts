export function slugify(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '')
}

export function formatTime(time: string) {
  const date = new Date(time)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}
