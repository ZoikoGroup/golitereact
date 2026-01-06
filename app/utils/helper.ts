export function encodeIds(ids: number[]): string {
  return btoa(JSON.stringify(ids));
}

export function encodeString(slugs: string[]): string {
  return btoa(JSON.stringify(slugs));
}