export interface Env { ALLOWED_ORIGINS?: string }
export type DnsType = 'A'|'AAAA'|'CNAME'|'MX'|'TXT'|'NS';
export interface ApiError { code:string; message:string }
export interface DnsAnswer { type:DnsType; value:string; ttl?:number; priority?:number }
