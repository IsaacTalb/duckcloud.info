import type {Metadata} from 'next';
import {headers} from 'next/headers';
import {notFound} from 'next/navigation';
import {ArticleContent} from '@/components/articles/ArticleContent';
import type {CmsArticle} from '@/lib/cms';

export const metadata:Metadata={title:'Article preview',robots:{index:false,follow:false,nocache:true}};
export const dynamic='force-dynamic';

export default async function DraftPreview({params}:{params:Promise<{id:string}>}) {
  const token=process.env.DUCKCLOUD_ADMIN_API_TOKEN;
  if(!token)notFound();
  const incoming=await headers(),base=process.env.NEXT_PUBLIC_DUCKCLOUD_API_URL||'https://api.duckcloud.info';
  const response=await fetch(`${base}/v1/admin/articles/${encodeURIComponent((await params).id)}/preview`,{headers:{authorization:`Bearer ${token}`,'x-admin-email':incoming.get('cf-access-authenticated-user-email')||''},cache:'no-store'});
  if(!response.ok)notFound();
  const payload=await response.json() as {data:CmsArticle};
  return <ArticleContent article={payload.data} preview/>;
}
