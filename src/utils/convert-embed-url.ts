export function convertToEmbedUrl(originalUrl: string): string {
  return originalUrl.replace('/pub?', '/embed?')
}
