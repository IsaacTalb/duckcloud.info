'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { markdownToHtml } from '@/lib/cms';
import {
  AdminApiError,
  AdminData,
  AdminRecord,
  adminRequest,
  formatDate,
  jsonRequest,
} from '@/lib/admin-client';
import { EmptyState, ErrorState, LoadingState, PageHeader, Status } from './AdminUI';

const text = (value: unknown) => (value == null ? '' : String(value));
const rows = (data: AdminData | null) => data?.results || [];
const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const statusTone = (value: unknown) =>
  value === 'published'
    ? 'success'
    : value === 'scheduled'
      ? 'warning'
      : value === 'archived'
        ? 'danger'
        : 'neutral';

function useAdminData(path: string) {
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [version, setVersion] = useState(0);
  useEffect(() => {
    let active = true;
    adminRequest(path)
      .then((next) => {
        if (!active) return;
        setData(next);
        setError(null);
      })
      .catch((issue) => {
        if (!active) return;
        setError(issue);
      });
    return () => {
      active = false;
    };
  }, [path, version]);
  return { data, error, reload: () => setVersion((value) => value + 1) };
}

function Notice({ message, error = false }: { message: string; error?: boolean }) {
  return (
    <p
      role={error ? 'alert' : 'status'}
      className={`admin-notice ${error ? 'admin-notice-error' : ''}`}
    >
      {message}
    </p>
  );
}

export function DashboardView() {
  const { data, error, reload } = useAdminData('dashboard');
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (!data) return <LoadingState label="Loading publishing overview" />;
  const metrics = [
    ['published', 'Published', 'Live articles available to readers'],
    ['drafts', 'Drafts', 'Articles still in production'],
    ['scheduled', 'Scheduled', 'Queued for future publication'],
    ['media', 'Media', 'Assets in the content library'],
  ];
  return (
    <>
      <PageHeader
        eyebrow="Editorial control"
        title="Publishing overview"
        description="A live operational view of Duck Cloud content and distribution."
        actions={
          <Link className="admin-button admin-button-primary" href="/admin/articles/new">
            New article
          </Link>
        }
      />
      <section className="admin-metrics" aria-label="Publishing metrics">
        {metrics.map(([key, label, detail]) => (
          <article key={key} className="admin-metric">
            <span>{label}</span>
            <strong>{text(data[key] ?? 0)}</strong>
            <p>{detail}</p>
          </article>
        ))}
      </section>
      <div className="admin-grid-2">
        <Recent title="Recently updated" records={data.recent_articles || []} kind="article" />
        <Recent title="Recent media" records={data.recent_media || []} kind="media" />
      </div>
    </>
  );
}

function Recent({
  title,
  records,
  kind,
}: {
  title: string;
  records: AdminRecord[];
  kind: 'article' | 'media';
}) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <h2>{title}</h2>
        <span>{records.length} shown</span>
      </div>
      {records.length ? (
        <div className="admin-list">
          {records.map((record, index) => (
            <div key={text(record.id || index)}>
              <strong>{text(record.title || record.filename)}</strong>
              <span>{kind === 'article' ? text(record.status) : text(record.mime_type)}</span>
              <small>{formatDate(record.updated_at || record.created_at)}</small>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No recent ${kind === 'article' ? 'articles' : 'media'}`}
          detail="New activity will appear here."
        />
      )}
    </section>
  );
}

export function ArticlesView() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const { data, error, reload } = useAdminData(
    `articles?page=${page}&limit=20&q=${encodeURIComponent(query)}&status=${encodeURIComponent(status)}`
  );
  return (
    <>
      <PageHeader
        eyebrow="Content inventory"
        title="Articles"
        description="Search, review and manage the publication pipeline."
        actions={
          <Link className="admin-button admin-button-primary" href="/admin/articles/new">
            New article
          </Link>
        }
      />
      <section className="admin-toolbar">
        <label>
          <span>Search</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Title or slug"
          />
        </label>
        <label>
          <span>Status</span>
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
          >
            <option value="">All statuses</option>
            {['draft', 'scheduled', 'published', 'archived'].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <button className="admin-button admin-button-secondary" onClick={reload}>
          Refresh
        </button>
      </section>
      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : !data ? (
        <LoadingState label="Loading articles" />
      ) : (
        <section className="admin-panel admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Article</th>
                <th>Status</th>
                <th>Category</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {rows(data).map((article) => (
                <tr key={text(article.id)}>
                  <td>
                    <Link href={`/admin/articles/${text(article.id)}`}>
                      <strong>{text(article.title)}</strong>
                      <small>/{text(article.slug)}</small>
                    </Link>
                  </td>
                  <td>
                    <Status tone={statusTone(article.status)}>{text(article.status)}</Status>
                  </td>
                  <td>{text(article.category || 'Uncategorized')}</td>
                  <td>{formatDate(article.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!rows(data).length && (
            <EmptyState
              title="No articles found"
              detail="Create an article or adjust the current filters."
            />
          )}
        </section>
      )}
      {data && (
        <nav className="admin-pagination" aria-label="Article pages">
          <button disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>
            Previous
          </button>
          <span>
            Page {page} · {text(data.total || 0)} articles
          </span>
          <button
            disabled={page * 20 >= Number(data.total || 0)}
            onClick={() => setPage((value) => value + 1)}
          >
            Next
          </button>
        </nav>
      )}
    </>
  );
}

const emptyArticle: Record<string, string> = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  status: 'draft',
  category_id: '',
  seo_title: '',
  seo_description: '',
  published_at: '',
  author_name: 'Duck Cloud Editorial',
  featured_image_url: '',
  og_image_url: '',
  updated_at: '',
};
export function ArticleEditorView({ id }: { id?: string }) {
  const isNew = !id || id === 'new';
  const [form, setForm] = useState(emptyArticle);
  const [categories, setCategories] = useState<AdminRecord[]>([]);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<unknown>(null);
  const [preview, setPreview] = useState(false);
  const slugEdited = useRef(false);
  useEffect(() => {
    adminRequest('categories')
      .then((data) => setCategories(rows(data)))
      .catch(() => setCategories([]));
    if (!isNew)
      adminRequest(`articles/${id}`)
        .then((data) => {
          setForm(
            Object.fromEntries(Object.entries(data).map(([key, value]) => [key, text(value)]))
          );
          slugEdited.current = true;
        })
        .catch(setError);
  }, [id, isNew]);
  const change = (name: string, value: string) => {
    setDirty(true);
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === 'title' && !slugEdited.current ? { slug: slugify(value) } : {}),
    }));
  };
  const save = useCallback(
    async (nextStatus?: string) => {
      setSaving(true);
      setError(null);
      setMessage('');
      const payload = {
        ...form,
        status: nextStatus || form.status,
        featured: form.featured === '1',
        published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
        create_revision: true,
      };
      try {
        const data = await adminRequest(
          `articles${isNew ? '' : `/${id}`}`,
          jsonRequest(isNew ? 'POST' : 'PATCH', payload)
        );
        setDirty(false);
        setMessage(nextStatus === 'published' ? 'Article published.' : 'Changes saved.');
        if (isNew && data.id) location.href = `/admin/articles/${text(data.id)}`;
        else
          setForm((current) => ({
            ...current,
            status: text(payload.status),
            updated_at: text(data.updated_at || current.updated_at),
          }));
      } catch (issue) {
        setError(issue);
      } finally {
        setSaving(false);
      }
    },
    [form, id, isNew]
  );
  if (error && !form.title) return <ErrorState error={error} />;
  return (
    <>
      <PageHeader
        eyebrow={isNew ? 'New story' : 'Article workspace'}
        title={isNew ? 'Create article' : 'Edit article'}
        description="Write useful, search-focused technical content with clear metadata and publication controls."
        actions={
          <>
            <span className="admin-save-state">{dirty ? 'Unsaved changes' : 'Up to date'}</span>
            <button
              disabled={saving}
              className="admin-button admin-button-secondary"
              onClick={() => save('draft')}
            >
              Save draft
            </button>
            <button
              disabled={saving}
              className="admin-button admin-button-primary"
              onClick={() => save('published')}
            >
              Publish
            </button>
          </>
        }
      />
      {message && <Notice message={message} />}{' '}
      {error && <Notice error message={error instanceof Error ? error.message : 'Save failed.'} />}
      <div className="admin-editor-grid">
        <section className="admin-panel admin-form">
          <label>
            <span>Headline</span>
            <input
              value={form.title || ''}
              onChange={(event) => change('title', event.target.value)}
              placeholder="A specific, useful technical headline"
            />
          </label>
          <div className="admin-form-row">
            <label>
              <span>Slug</span>
              <input
                value={form.slug || ''}
                onChange={(event) => {
                  slugEdited.current = true;
                  change('slug', slugify(event.target.value));
                }}
              />
              <small>/blog/{form.slug || 'article-slug'}</small>
            </label>
            <label>
              <span>Category</span>
              <select
                value={form.category_id || ''}
                onChange={(event) => change('category_id', event.target.value)}
              >
                <option value="">Uncategorized</option>
                {categories.map((category) => (
                  <option value={text(category.id)} key={text(category.id)}>
                    {text(category.name)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            <span>Search excerpt</span>
            <textarea
              rows={3}
              value={form.excerpt || ''}
              onChange={(event) => change('excerpt', event.target.value)}
              placeholder="Summarize the practical value in one or two sentences."
            />
          </label>
          <div className="admin-editor-tabs">
            <button className={!preview ? 'is-active' : ''} onClick={() => setPreview(false)}>
              Markdown
            </button>
            <button className={preview ? 'is-active' : ''} onClick={() => setPreview(true)}>
              Preview
            </button>
          </div>
          {preview ? (
            <article
              className="admin-preview"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(form.content || '').html }}
            />
          ) : (
            <textarea
              className="admin-code-editor"
              value={form.content || ''}
              onChange={(event) => change('content', event.target.value)}
              aria-label="Article Markdown"
              placeholder="# Start with the reader's problem…"
            />
          )}
        </section>
        <aside className="admin-panel admin-form admin-editor-aside">
          <h2>Distribution</h2>
          <label>
            <span>Status</span>
            <select
              value={form.status || 'draft'}
              onChange={(event) => change('status', event.target.value)}
            >
              {['draft', 'scheduled', 'published', 'archived'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Publication time</span>
            <input
              type="datetime-local"
              value={form.published_at ? form.published_at.slice(0, 16) : ''}
              onChange={(event) => change('published_at', event.target.value)}
            />
          </label>
          <label>
            <span>Author</span>
            <input
              value={form.author_name || ''}
              onChange={(event) => change('author_name', event.target.value)}
            />
          </label>
          <label>
            <span>SEO title</span>
            <input
              value={form.seo_title || ''}
              onChange={(event) => change('seo_title', event.target.value)}
            />
          </label>
          <label>
            <span>SEO description</span>
            <textarea
              rows={4}
              value={form.seo_description || ''}
              onChange={(event) => change('seo_description', event.target.value)}
            />
          </label>
          <label>
            <span>Featured image URL</span>
            <input
              type="url"
              value={form.featured_image_url || ''}
              onChange={(event) => change('featured_image_url', event.target.value)}
            />
          </label>
          <label>
            <span>Social image URL</span>
            <input
              type="url"
              value={form.og_image_url || ''}
              onChange={(event) => change('og_image_url', event.target.value)}
            />
          </label>
        </aside>
      </div>
    </>
  );
}

export function CategoriesView() {
  const { data, error, reload } = useAdminData('categories');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [message, setMessage] = useState('');
  const create = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await adminRequest('categories', jsonRequest('POST', { name, slug: slug || slugify(name) }));
      setName('');
      setSlug('');
      setMessage('Category created.');
      reload();
    } catch (issue) {
      setMessage(issue instanceof Error ? issue.message : 'Could not create category.');
    }
  };
  return (
    <>
      <PageHeader
        eyebrow="Taxonomy"
        title="Categories"
        description="Maintain broad, reader-facing sections for navigation and discovery."
      />
      <form className="admin-inline-create" onSubmit={create}>
        <label>
          <span>Name</span>
          <input
            required
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (!slug) setSlug(slugify(event.target.value));
            }}
          />
        </label>
        <label>
          <span>Slug</span>
          <input required value={slug} onChange={(event) => setSlug(slugify(event.target.value))} />
        </label>
        <button className="admin-button admin-button-primary">Add category</button>
      </form>
      {message && <Notice message={message} />}
      <CollectionTable data={data} error={error} reload={reload} type="category" />
    </>
  );
}

export function TagsView() {
  const { data, error, reload } = useAdminData('tags');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [message, setMessage] = useState('');
  const create = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await adminRequest('tags', jsonRequest('POST', { name, slug: slug || slugify(name) }));
      setName('');
      setSlug('');
      setMessage('Tag created.');
      reload();
    } catch (issue) {
      setMessage(issue instanceof Error ? issue.message : 'Could not create tag.');
    }
  };
  const rename = async (tag: AdminRecord) => {
    const next = window.prompt('Tag name', text(tag.name));
    if (!next || next === tag.name) return;
    try {
      await adminRequest(
        `tags/${text(tag.id)}`,
        jsonRequest('PATCH', { name: next, slug: slugify(next) })
      );
      reload();
    } catch (issue) {
      setMessage(issue instanceof Error ? issue.message : 'Could not update tag.');
    }
  };
  const remove = async (tag: AdminRecord) => {
    if (!confirm(`Delete “${text(tag.name)}”? Tags in use cannot be deleted.`)) return;
    try {
      await adminRequest(`tags/${text(tag.id)}`, { method: 'DELETE' });
      reload();
    } catch (issue) {
      setMessage(issue instanceof Error ? issue.message : 'Could not delete tag.');
    }
  };
  return (
    <>
      <PageHeader
        eyebrow="Taxonomy"
        title="Tags"
        description="Use focused topic labels to connect related technical coverage."
      />
      <form className="admin-inline-create" onSubmit={create}>
        <label>
          <span>Name</span>
          <input
            required
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (!slug) setSlug(slugify(event.target.value));
            }}
          />
        </label>
        <label>
          <span>Slug</span>
          <input required value={slug} onChange={(event) => setSlug(slugify(event.target.value))} />
        </label>
        <button className="admin-button admin-button-primary">Add tag</button>
      </form>
      {message && <Notice message={message} />}{' '}
      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : !data ? (
        <LoadingState label="Loading tags" />
      ) : (
        <section className="admin-panel admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tag</th>
                <th>Slug</th>
                <th>Articles</th>
                <th>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows(data).map((tag) => (
                <tr key={text(tag.id)}>
                  <td>
                    <strong>{text(tag.name)}</strong>
                  </td>
                  <td>
                    <code>{text(tag.slug)}</code>
                  </td>
                  <td>{text(tag.article_count || 0)}</td>
                  <td className="admin-row-actions">
                    <button onClick={() => rename(tag)}>Rename</button>
                    <button className="is-danger" onClick={() => remove(tag)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!rows(data).length && (
            <EmptyState title="No tags yet" detail="Add a focused topic tag above." />
          )}
        </section>
      )}
    </>
  );
}

function CollectionTable({
  data,
  error,
  reload,
  type,
}: {
  data: AdminData | null;
  error: unknown;
  reload: () => void;
  type: string;
}) {
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (!data) return <LoadingState label={`Loading ${type}s`} />;
  return (
    <section className="admin-panel admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows(data).map((item) => (
            <tr key={text(item.id)}>
              <td>
                <strong>{text(item.name)}</strong>
              </td>
              <td>
                <code>{text(item.slug)}</code>
              </td>
              <td>{text(item.description || '—')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!rows(data).length && (
        <EmptyState
          title={`No ${type}s yet`}
          detail={`Create the first ${type} using the form above.`}
        />
      )}
    </section>
  );
}

export function MediaView() {
  const { data, error, reload } = useAdminData('media?limit=50');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const upload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setUploading(true);
    try {
      await adminRequest('media/upload', { method: 'POST', body: form });
      event.currentTarget.reset();
      setMessage('Media uploaded.');
      reload();
    } catch (issue) {
      setMessage(issue instanceof Error ? issue.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };
  const remove = async (item: AdminRecord) => {
    if (!confirm(`Delete “${text(item.filename)}”?`)) return;
    try {
      await adminRequest(`media/${text(item.id)}`, { method: 'DELETE' });
      reload();
    } catch (issue) {
      setMessage(issue instanceof Error ? issue.message : 'Delete failed.');
    }
  };
  return (
    <>
      <PageHeader
        eyebrow="Asset library"
        title="Media"
        description="Upload web-ready editorial images. JPEG, PNG, WebP, AVIF and GIF up to 10 MB."
      />
      <form className="admin-upload" onSubmit={upload}>
        <label>
          <span>Image file</span>
          <input
            required
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          />
        </label>
        <label>
          <span>Alternative text</span>
          <input name="alt_text" placeholder="Describe the image for readers" />
        </label>
        <button disabled={uploading} className="admin-button admin-button-primary">
          {uploading ? 'Uploading…' : 'Upload image'}
        </button>
      </form>
      {message && <Notice message={message} />}{' '}
      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : !data ? (
        <LoadingState label="Loading media" />
      ) : (
        <section className="admin-media-grid">
          {rows(data).map((item) => (
            <article className="admin-media-card" key={text(item.id)}>
              <div className="admin-media-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={text(item.url)} alt={text(item.alt_text)} />
              </div>
              <div>
                <strong>{text(item.filename)}</strong>
                <p>
                  {text(item.mime_type)} · {Math.ceil(Number(item.size_bytes || 0) / 1024)} KB
                </p>
                <button className="admin-link-danger" onClick={() => remove(item)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
          {!rows(data).length && (
            <EmptyState
              title="No media uploaded"
              detail="Upload the first editorial image above."
            />
          )}
        </section>
      )}
    </>
  );
}

export function ToolsView() {
  const { data, error, reload } = useAdminData('tools');
  const [message, setMessage] = useState('');
  const toggle = async (item: AdminRecord, key: 'featured' | 'is_visible') => {
    try {
      await adminRequest(
        `tools/${text(item.tool_slug)}`,
        jsonRequest('PATCH', { ...item, [key]: !Boolean(item[key]) })
      );
      setMessage('Tool settings updated.');
      reload();
    } catch (issue) {
      setMessage(issue instanceof Error ? issue.message : 'Update failed.');
    }
  };
  return (
    <>
      <PageHeader
        eyebrow="Traffic surfaces"
        title="Tools"
        description="Control visibility and promotion for the utility pages that bring readers to Duck Cloud."
      />
      {message && <Notice message={message} />}{' '}
      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : !data ? (
        <LoadingState label="Loading tools" />
      ) : (
        <section className="admin-panel admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Visibility</th>
                <th>Promotion</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {rows(data).map((item) => (
                <tr key={text(item.tool_slug)}>
                  <td>
                    <strong>{text(item.custom_title || item.tool_slug)}</strong>
                    <small>/{text(item.tool_slug)}</small>
                  </td>
                  <td>
                    <button onClick={() => toggle(item, 'is_visible')}>
                      <Status tone={item.is_visible ? 'success' : 'neutral'}>
                        {item.is_visible ? 'Visible' : 'Hidden'}
                      </Status>
                    </button>
                  </td>
                  <td>
                    <button onClick={() => toggle(item, 'featured')}>
                      <Status tone={item.featured ? 'warning' : 'neutral'}>
                        {item.featured ? 'Featured' : 'Standard'}
                      </Status>
                    </button>
                  </td>
                  <td>{formatDate(item.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}

const settingFields = [
  ['site_title', 'Site title', 'Duck Cloud'],
  [
    'site_description',
    'Site description',
    'Practical tools and technical guides for developers and operators.',
  ],
  ['default_author', 'Default author', 'Duck Cloud Editorial'],
  ['posts_per_page', 'Posts per page', '12'],
  ['social_image_url', 'Default social image URL', ''],
] as const;
export function SettingsView() {
  const { data, error, reload } = useAdminData('settings');
  const [form, setForm] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (data?.settings)
      setForm(
        Object.fromEntries(
          settingFields.map(([key, , fallback]) => [key, text(data.settings?.[key] ?? fallback)])
        )
      );
  }, [data]);
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await adminRequest(
        'settings',
        jsonRequest('PATCH', { ...form, posts_per_page: Number(form.posts_per_page) })
      );
      setMessage('Public content defaults saved.');
      reload();
    } catch (issue) {
      setMessage(issue instanceof Error ? issue.message : 'Settings could not be saved.');
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      <PageHeader
        eyebrow="Public defaults"
        title="Settings"
        description="Safe editorial metadata only. Authentication, deployment and secret values are never exposed here."
      />
      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : !data ? (
        <LoadingState label="Loading settings" />
      ) : (
        <form className="admin-panel admin-form admin-settings" onSubmit={save}>
          {settingFields.map(([key, label]) => (
            <label key={key}>
              <span>{label}</span>
              {key === 'site_description' ? (
                <textarea
                  rows={4}
                  value={form[key] || ''}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [key]: event.target.value }))
                  }
                />
              ) : (
                <input
                  type={key === 'posts_per_page' ? 'number' : key.includes('url') ? 'url' : 'text'}
                  min={key === 'posts_per_page' ? 1 : undefined}
                  max={key === 'posts_per_page' ? 50 : undefined}
                  value={form[key] || ''}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [key]: event.target.value }))
                  }
                />
              )}
            </label>
          ))}
          <div className="admin-form-footer">
            <button disabled={saving} className="admin-button admin-button-primary">
              {saving ? 'Saving…' : 'Save settings'}
            </button>
            {message && <span role="status">{message}</span>}
          </div>
        </form>
      )}
    </>
  );
}

export function ImportExportView() {
  const { data, error, reload } = useAdminData('import');
  const [document, setDocument] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const exportData = async () => {
    setBusy(true);
    try {
      const payload = await adminRequest('export');
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const anchor = window.document.createElement('a');
      anchor.href = url;
      anchor.download = `duckcloud-cms-${new Date().toISOString().slice(0, 10)}.json`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage('Export prepared.');
    } catch (issue) {
      setMessage(issue instanceof Error ? issue.message : 'Export failed.');
    } finally {
      setBusy(false);
    }
  };
  const importData = async () => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(document);
    } catch {
      setMessage('Choose a valid JSON export before importing.');
      return;
    }
    if (
      !confirm(
        'Import this document? Existing records are handled according to the document conflict policy.'
      )
    )
      return;
    setBusy(true);
    try {
      const result = await adminRequest('import', jsonRequest('POST', parsed));
      setMessage(
        `Import completed: ${text(result.imported || result.count || 'records processed')}.`
      );
    } catch (issue) {
      setMessage(issue instanceof Error ? issue.message : 'Import failed.');
    } finally {
      setBusy(false);
    }
  };
  const file = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) setDocument(await selected.text());
  };
  return (
    <>
      <PageHeader
        eyebrow="Portability"
        title="Import & export"
        description="Move versioned CMS content as JSON. Files are validated by the API before records are written."
        actions={
          <button
            disabled={busy}
            className="admin-button admin-button-secondary"
            onClick={exportData}
          >
            Export JSON
          </button>
        }
      />
      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : !data ? (
        <LoadingState label="Loading import capabilities" />
      ) : (
        <div className="admin-grid-2">
          <section className="admin-panel admin-form">
            <div className="admin-panel-heading">
              <h2>Import content</h2>
              <Status tone="neutral">JSON only</Status>
            </div>
            <label>
              <span>Choose export file</span>
              <input type="file" accept="application/json,.json" onChange={file} />
            </label>
            <label>
              <span>Document preview</span>
              <textarea
                className="admin-import-document"
                value={document}
                onChange={(event) => setDocument(event.target.value)}
                placeholder={'{\n  "version": 1,\n  "articles": []\n}'}
              />
            </label>
            <button
              disabled={busy || !document}
              className="admin-button admin-button-primary"
              onClick={importData}
            >
              Validate and import
            </button>
          </section>
          <section className="admin-panel admin-capabilities">
            <h2>Transfer safeguards</h2>
            <p>
              {text(
                data.description ||
                  'Imports are schema-validated, size-limited and audited before content becomes available.'
              )}
            </p>
            <dl>
              <div>
                <dt>Format version</dt>
                <dd>{text(data.version || 1)}</dd>
              </div>
              <div>
                <dt>Maximum records</dt>
                <dd>{text(data.max_records || 'API controlled')}</dd>
              </div>
              <div>
                <dt>Conflict handling</dt>
                <dd>{text(data.conflict_policy || 'Validated by API')}</dd>
              </div>
            </dl>
          </section>
        </div>
      )}
      {message && <Notice message={message} />}
    </>
  );
}

export function UnknownView({ section }: { section: string }) {
  return (
    <ErrorState
      error={new AdminApiError(`No admin view is registered for “${section}”.`, 'NOT_FOUND', 404)}
    />
  );
}
