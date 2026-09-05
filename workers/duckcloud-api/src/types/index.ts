export interface Env { ALLOWED_ORIGINS?: string; ADMIN_API_TOKEN?: string; R2_PUBLIC_BASE_URL?: string; DB: D1Database; MEDIA: R2Bucket }
export type DnsType = 'A'|'AAAA'|'CNAME'|'MX'|'TXT'|'NS';
export interface ApiError { code:string; message:string }
export interface DnsAnswer { type:DnsType; value:string; ttl?:number; priority?:number }
