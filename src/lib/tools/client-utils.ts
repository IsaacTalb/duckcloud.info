export const utf8ToBase64 = (value: string) => {
  let binary = '';
  for (const byte of new TextEncoder().encode(value)) binary += String.fromCharCode(byte);
  return btoa(binary);
};

export const base64ToUtf8 = (value: string) => {
  const normalized = value.trim().replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
  const binary = atob(normalized);
  return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)));
};

export async function digest(value: string, algorithm: 'SHA-256' | 'SHA-512') {
  const result = await crypto.subtle.digest(algorithm, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(result), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export const parseJson = (value: string) => JSON.parse(value) as unknown;
export const hexByte = (value: number) => value.toString(16).padStart(2, '0').toUpperCase();
