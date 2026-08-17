// MD5 is retained for legacy checksums only; Web Crypto deliberately does not expose it.
const add = (x: number, y: number) => (x + y) | 0;
const rol = (x: number, n: number) => (x << n) | (x >>> (32 - n));
const cmn = (q:number,a:number,b:number,x:number,s:number,t:number) => add(rol(add(add(a,q),add(x,t)),s),b);
const ff=(a:number,b:number,c:number,d:number,x:number,s:number,t:number)=>cmn((b&c)|(~b&d),a,b,x,s,t);
const gg=(a:number,b:number,c:number,d:number,x:number,s:number,t:number)=>cmn((b&d)|(c&~d),a,b,x,s,t);
const hh=(a:number,b:number,c:number,d:number,x:number,s:number,t:number)=>cmn(b^c^d,a,b,x,s,t);
const ii=(a:number,b:number,c:number,d:number,x:number,s:number,t:number)=>cmn(c^(b|~d),a,b,x,s,t);
export function md5(value:string) {
  const bytes=[...new TextEncoder().encode(value)], bitLength=bytes.length*8; bytes.push(128); while(bytes.length%64!==56) bytes.push(0); for(let i=0;i<8;i++) bytes.push(Math.floor(bitLength/2**(8*i))&255);
  let a=0x67452301|0,b=0xefcdab89|0,c=0x98badcfe|0,d=0x10325476|0;
  const shifts=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21];
  for(let o=0;o<bytes.length;o+=64){const x=Array.from({length:16},(_,j)=>bytes[o+j*4]|bytes[o+j*4+1]<<8|bytes[o+j*4+2]<<16|bytes[o+j*4+3]<<24); let A=a,B=b,C=c,D=d;
    for(let j=0;j<64;j++){let f:number,g:number,fn:typeof ff,s:number;if(j<16){fn=ff;g=j;s=shifts[j%4]}else if(j<32){fn=gg;g=(5*j+1)%16;s=shifts[4+j%4]}else if(j<48){fn=hh;g=(3*j+5)%16;s=shifts[8+j%4]}else{fn=ii;g=(7*j)%16;s=shifts[12+j%4]} f=fn(A,B,C,D,x[g],s,Math.floor(Math.abs(Math.sin(j+1))*2**32)|0); A=D;D=C;C=B;B=f;} a=add(a,A);b=add(b,B);c=add(c,C);d=add(d,D);
  } return [a,b,c,d].map(n=>[0,8,16,24].map(s=>((n>>>s)&255).toString(16).padStart(2,'0')).join('')).join('');
}
