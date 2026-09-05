'use client';

import { useEffect, useState } from 'react';
import { adminRequest } from '@/lib/admin-client';
import type { AnalyticsSummary } from '@/types/analytics';
import { EmptyState, ErrorState, LoadingState, PageHeader, Status } from './AdminUI';

type AnalyticsData = AnalyticsSummary & Record<string, unknown>;
const number = (value: unknown) => Number(value || 0).toLocaleString();
const label = (identifier: string) => identifier.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

export function AnalyticsView() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let active = true;
    adminRequest(`analytics?days=${days}&limit=20`)
      .then((result) => {
        if (!active) return;
        setData(result as AnalyticsData);
        setError(null);
      })
      .catch((issue) => {
        if (!active) return;
        setError(issue);
      });
    return () => { active = false; };
  }, [days, version]);

  return (
    <>
      <PageHeader
        eyebrow="Audience"
        title="Content analytics"
        description="Aggregate page views for public articles and individual tools. Duck Cloud stores no IP address, cookie, referrer, or user-agent data."
        actions={
          <div className="admin-actions">
            <label className="admin-range-control">
              <span>Reporting window</span>
              <select value={days} onChange={(event) => setDays(Number(event.target.value))}>
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
            </label>
            <button className="admin-button admin-button-secondary" onClick={() => setVersion((value) => value + 1)}>Refresh</button>
          </div>
        }
      />
      {error ? <ErrorState error={error} onRetry={() => setVersion((value) => value + 1)} /> : !data ? <LoadingState label="Loading analytics" /> : (
        <>
          <section className="admin-metrics" aria-label="Page-view totals">
            <article className="admin-metric"><span>All-time views</span><strong>{number(data.totals?.views)}</strong><p>Every recorded blog and tool view</p></article>
            <article className="admin-metric"><span>Blog views</span><strong>{number(data.totals?.blog)}</strong><p>Published and source-controlled articles</p></article>
            <article className="admin-metric"><span>Tool views</span><strong>{number(data.totals?.tool)}</strong><p>Individual interactive tool pages</p></article>
            <article className="admin-metric"><span>Current window</span><strong>{data.range?.days ?? days}d</strong><p>{data.range?.from} to {data.range?.to}</p></article>
          </section>
          <div className="admin-grid-2">
            <section className="admin-panel admin-table-wrap">
              <div className="admin-panel-heading"><h2>Top content</h2><span>{data.top_content.length} ranked</span></div>
              {data.top_content.length ? (
                <table className="admin-table">
                  <thead><tr><th>Content</th><th>Type</th><th>Views</th></tr></thead>
                  <tbody>{data.top_content.map((item) => (
                    <tr key={`${item.kind}:${item.identifier}`}>
                      <td><a href={`/${item.kind === 'blog' ? 'blog' : 'tools'}/${item.identifier}`} target="_blank" rel="noreferrer"><strong>{label(item.identifier)}</strong><small>/{item.kind === 'blog' ? 'blog' : 'tools'}/{item.identifier}</small></a></td>
                      <td><Status tone={item.kind === 'blog' ? 'success' : 'neutral'}>{item.kind}</Status></td>
                      <td>{number(item.views)}</td>
                    </tr>
                  ))}</tbody>
                </table>
              ) : <EmptyState title="No views recorded yet" detail="Counts begin after this analytics release reaches production." />}
            </section>
            <section className="admin-panel admin-table-wrap">
              <div className="admin-panel-heading"><h2>Daily traffic</h2><span>UTC</span></div>
              {data.recent_days.length ? (
                <table className="admin-table">
                  <thead><tr><th>Date</th><th>Blog</th><th>Tools</th><th>Total</th></tr></thead>
                  <tbody>{[...data.recent_days].reverse().map((item) => (
                    <tr key={item.day}><td>{item.day}</td><td>{number(item.blog)}</td><td>{number(item.tool)}</td><td><strong>{number(item.views)}</strong></td></tr>
                  ))}</tbody>
                </table>
              ) : <EmptyState title="No daily data yet" detail="The first public page views will appear here automatically." />}
            </section>
          </div>
          <p className="admin-privacy-note">Privacy model: daily aggregate counters only. No visitor-level profiles or cross-page identifiers are created.</p>
        </>
      )}
    </>
  );
}
