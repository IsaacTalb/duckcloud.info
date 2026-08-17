export type FAQItem = readonly [question: string, answer: string];
export function ToolFAQ({ items }: { items: readonly FAQItem[] }) {
  return <section aria-labelledby="tool-faq">
    <h2 id="tool-faq" className="content-heading">Frequently asked questions</h2>
    <div className="mt-4 space-y-3">{items.map(([question, answer]) =>
      <details key={question} className="rounded-lg border border-slate-700 bg-slate-900 p-4">
        <summary className="cursor-pointer font-semibold text-white">{question}</summary>
        <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
      </details>)}</div>
  </section>;
}
