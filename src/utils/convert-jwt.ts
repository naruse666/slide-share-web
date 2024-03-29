export const convertToJST = (dateString: string): string => {
  const date = new Date(dateString)
  date.setHours(date.getHours() + 9)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}/${month}/${day}`
}
