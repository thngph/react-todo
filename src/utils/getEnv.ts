// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getEnv(key: keyof ImportMetaEnv, fallback?: any): any {
  return import.meta.env[key] || fallback || '';
}
