PRAGMA foreign_keys = ON;

CREATE TABLE article_revisions (
  id TEXT PRIMARY KEY,
  article_id TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  featured_image_url TEXT,
  og_image_url TEXT,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  created_by TEXT,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE INDEX idx_article_revisions_article ON article_revisions(article_id, created_at DESC);
