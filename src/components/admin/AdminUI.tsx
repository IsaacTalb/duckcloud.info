import type { ReactNode } from 'react';
import { adminErrorCopy } from '@/lib/admin-client';

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="admin-page-header">
      <div>
        <p className="admin-kicker">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="admin-description">{description}</p>}
      </div>
      {actions && <div className="admin-actions">{actions}</div>}
    </header>
  );
}

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const copy = adminErrorCopy(error);
  return (
    <section role="alert" className="admin-state admin-state-error">
      <p className="admin-kicker">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p>{copy.detail}</p>
      {onRetry && (
        <button type="button" className="admin-button admin-button-secondary" onClick={onRetry}>
          Retry request
        </button>
      )}
    </section>
  );
}

export function LoadingState({ label = 'Loading workspace data' }: { label?: string }) {
  return (
    <section aria-busy="true" aria-live="polite" className="admin-state">
      <span className="admin-loader" />
      <p>{label}…</p>
    </section>
  );
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="admin-empty">
      <strong>{title}</strong>
      <p>{detail}</p>
    </div>
  );
}

export function Status({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
}) {
  return <span className={`admin-status admin-status-${tone}`}>{children}</span>;
}
