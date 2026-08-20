import {NextRequest,NextResponse} from 'next/server';
export function proxy(request:NextRequest){if(process.env.NODE_ENV==='development')return NextResponse.next();const email=request.headers.get('cf-access-authenticated-user-email')?.toLowerCase(),allowed=process.env.DUCKCLOUD_ADMIN_ALLOWED_EMAIL?.toLowerCase();if(!allowed||email!==allowed)return new NextResponse('Administrator access is required.',{status:401});return NextResponse.next();}
export const config={matcher:['/admin/:path*','/api/admin/:path*']};
