import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonFormatterClient } from '@/components/tools/clients/JsonFormatterClient';
import { Base64EncoderClient } from '@/components/tools/clients/Base64EncoderClient';
import { Sha256Client } from '@/components/tools/clients/Sha256Client';
import { UuidClient } from '@/components/tools/clients/UuidClient';
import { TimestampClient } from '@/components/tools/clients/TimestampClient';
import { ToolboxClient, WordCounterClient } from '@/components/tools/clients/ToolboxClient';
import { Phase3Client } from '@/components/tools/clients/Phase3Client';
import { RemoteToolClient } from '@/components/tools/clients/RemoteToolClient';
import { PasswordGeneratorClient, PasswordStrengthClient } from '@/components/tools/clients/PasswordClient';
import { RelatedTools } from '@/components/tools/RelatedTools';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { ToolFAQ } from '@/components/tools/ToolFAQ';
import { getToolCategory, toolCategories } from '@/config/tool-categories';
import { activeTools, getRelatedTools, getTool, getToolsByCategory } from '@/config/tools';
const clients = {
  'json-formatter': JsonFormatterClient,
  'base64-encoder': Base64EncoderClient,
  'sha256-generator': Sha256Client,
  'uuid-generator': UuidClient,
  'unix-timestamp-converter': TimestampClient,
  'json-validator': () => <ToolboxClient tool="json-validator" />, 'json-minifier': () => <ToolboxClient tool="json-minifier" />, 'json-viewer': () => <ToolboxClient tool="json-viewer" />,
  'base64-decoder': () => <ToolboxClient tool="base64-decoder" />, 'url-encoder': () => <ToolboxClient tool="url-encoder" />, 'url-decoder': () => <ToolboxClient tool="url-decoder" />,
  'sha512-generator': () => <ToolboxClient tool="sha512-generator" />, 'md5-generator': () => <ToolboxClient tool="md5-generator" />,
  'jwt-decoder': () => <ToolboxClient tool="jwt-decoder" />, 'jwt-expiry-checker': () => <ToolboxClient tool="jwt-expiry-checker" />,
  'hex-to-rgb': () => <ToolboxClient tool="hex-to-rgb" />, 'rgb-to-hex': () => <ToolboxClient tool="rgb-to-hex" />,
  'password-generator': PasswordGeneratorClient, 'password-strength': PasswordStrengthClient, 'word-counter': WordCounterClient,

};
const details: Record<
  string,
  { intro: string; steps: string[]; example: string; faq: [string, string][] }
> = {
  'json-formatter': {
    intro:
      'Readable JSON is easier to review, debug, and share. This formatter parses your input with the browser’s native JSON engine, reports syntax problems, and outputs consistently indented data.',
    steps: [
      'Paste or type JSON into the input field.',
      'Select Format JSON to validate and indent it.',
      'Copy the formatted result when it is ready.',
    ],
    example:
      'Input {"status":"ok","items":[1,2]} becomes a clean, multi-line object with two-space indentation.',
    faq: [
      ['Is my JSON uploaded?', 'No. Parsing and formatting happen entirely in this browser tab.'],
      [
        'Does this validate JSON?',
        'Yes. Invalid JSON produces a syntax message instead of a result.',
      ],
    ],
  },
  'base64-encoder': {
    intro:
      'Base64 represents binary data using portable ASCII characters. This encoder correctly converts Unicode text to UTF-8 bytes before encoding, so emoji and international characters work as expected.',
    steps: [
      'Enter the text you want to encode.',
      'Select Encode Base64.',
      'Copy the encoded output.',
    ],
    example: 'The text “Duck Cloud” encodes to RHVjayBDbG91ZA==.',
    faq: [
      [
        'Is Base64 encryption?',
        'No. Base64 is a reversible encoding and should not protect secrets.',
      ],
      ['Does it support Unicode?', 'Yes. Input is converted to UTF-8 before encoding.'],
    ],
  },
  'sha256-generator': {
    intro:
      'SHA-256 creates a fixed 256-bit digest used for integrity checks and content identification. Duck Cloud uses the native Web Crypto API rather than transmitting text to a hashing service.',
    steps: [
      'Enter the text to hash.',
      'Select Generate SHA-256.',
      'Copy the 64-character hexadecimal digest.',
    ],
    example:
      'The same exact input always creates the same 64-character digest; even a one-character change creates a very different result.',
    faq: [
      ['Can SHA-256 be reversed?', 'No. SHA-256 is designed as a one-way cryptographic hash.'],
      [
        'Should I hash passwords directly?',
        'No. Password storage requires a slow, salted password hashing algorithm such as Argon2 or scrypt.',
      ],
    ],
  },
  'uuid-generator': {
    intro:
      'UUID v4 values are 128-bit identifiers generated from cryptographically strong random bytes. They are useful for database keys, request IDs, fixtures, and distributed systems.',
    steps: [
      'Choose how many UUIDs you need (up to 100).',
      'Select Generate UUIDs.',
      'Copy the newline-separated values.',
    ],
    example: 'A UUID v4 looks like 1b4e28ba-2fa1-4f08-8e12-9a42c6f47a31.',
    faq: [
      [
        'Are these UUIDs secure?',
        'They use crypto.randomUUID(), backed by the browser’s secure random source.',
      ],
      ['Are generated values stored?', 'No. They remain only in the current browser tab.'],
    ],
  },
  'unix-timestamp-converter': {
    intro:
      'Unix time counts elapsed seconds since January 1, 1970 at 00:00:00 UTC. Convert seconds or millisecond timestamps into both UTC and your device’s local time.',
    steps: [
      'Enter a Unix timestamp in seconds or milliseconds.',
      'Review the UTC and local-time values instantly.',
      'Use Current time to reset the input to now.',
    ],
    example: 'The timestamp 0 represents Thursday, 1 January 1970 at 00:00:00 UTC.',
    faq: [
      [
        'Are seconds supported?',
        'Yes. Values of 10 digits or fewer are interpreted as seconds; longer values are treated as milliseconds.',
      ],
      [
        'Which timezone is used?',
        'The result shows both UTC and the timezone configured on your device.',
      ],
    ],
  },
};
export function generateStaticParams() {
  return [...activeTools.map(({ slug }) => ({ slug })), ...toolCategories.map(({ slug }) => ({ slug }))];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  const category = getToolCategory(slug);
  if (tool)
    return {
      title: tool.seo.title,
      description: tool.seo.description,
      alternates: { canonical: `/tools/${slug}` },
      openGraph: {
        title: tool.seo.title,
        description: tool.seo.description,
        url: `/tools/${slug}`,
        type: 'website',
      },
    };
  if (category)
    return {
      title: `${category.name} Tools`,
      description: category.description,
      alternates: { canonical: `/tools/${slug}` },
    };
  return {};
}
export default async function ToolOrCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) {
    const category = getToolCategory(slug);
    if (!category) notFound();
    const matches = getToolsByCategory(slug);
    return (
      <div className="page-container py-14">
        <nav className="breadcrumb">
          <Link href="/tools">Tools</Link>
          <span>/</span>
          <span>{category.name}</span>
        </nav>
        <h1 className="page-title mt-6">{category.name} tools</h1>
        <p className="page-lead mb-9">
          {category.description} Browser-local and remote lookup tools are clearly labelled, and every utility is available without an account.
        </p>
        <ToolGrid tools={matches} />
      </div>
    );
  }
  const Client = clients[slug as keyof typeof clients];
  const content = details[slug] ?? { intro: tool.execution === 'worker' ? `${tool.name} performs a time-limited remote lookup through Duck Cloud’s Cloudflare Worker. Only the submitted domain or URL is sent; results are not saved.` : `${tool.name} processes your input locally in this browser. Nothing entered into this tool is sent to Duck Cloud servers.`, steps: ['Paste or type your input in the tool.', 'Select the action button or use the displayed keyboard shortcut.', 'Review the result, then copy it or clear the tool.'], example: `Use the sample already provided in ${tool.name}, or replace it with your own input.`, faq: tool.execution === 'worker' ? [['What is sent to Duck Cloud?', 'Only the domain or URL required for this remote lookup. No account or uploaded file is needed.'], ['Are lookup results stored?', 'No. Duck Cloud does not store lookup history.'], ['Why is this remote?', 'Browsers cannot reliably perform DNS and cross-origin network inspection.']] as [string,string][] : [['Does this send my input to a server?', 'No. All processing happens client-side in your browser.'], ['What happens with malformed input?', 'The tool displays a helpful error and remains ready for corrected input.'], ['Can I paste and use a keyboard?', 'Yes. Standard paste shortcuts work, and applicable tools support Ctrl or Command plus Enter.']] as [string,string][] };
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  return (
    <div className="page-container py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/tools">Tools</Link>
        <span>/</span>
        <Link href={`/tools/${tool.category}`}>{getToolCategory(tool.category)?.name}</Link>
        <span>/</span>
        <span aria-current="page">{tool.name}</span>
      </nav>
      <ToolHeader tool={tool} />
      {tool.execution === 'worker' ? <RemoteToolClient tool={slug} /> : Client ? <Client /> : <Phase3Client tool={slug} />}
      <article className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="content-heading">About this {tool.shortName ?? tool.name} tool</h2>
          <p className="content-copy">{content.intro}</p>
          <h2 className="content-heading mt-9">How to use it</h2>
          <ol className="mt-4 space-y-3">
            {content.steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-slate-300">
                <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-yellow-400 font-bold text-slate-950">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <h2 className="content-heading mt-9">Example</h2>
          <p className="content-copy">{content.example}</p>
        </div>
        <aside><ToolFAQ items={content.faq} /></aside>
      </article>
      <RelatedTools tools={getRelatedTools(tool)} />
    </div>
  );
}
