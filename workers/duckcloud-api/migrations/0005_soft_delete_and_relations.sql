PRAGMA foreign_keys = ON;

ALTER TABLE articles ADD COLUMN deleted_at TEXT;

CREATE TABLE article_relations (
  article_id TEXT NOT NULL,
  related_article_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (article_id, related_article_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (related_article_id) REFERENCES articles(id) ON DELETE CASCADE,
  CHECK (article_id <> related_article_id)
);

CREATE INDEX idx_articles_deleted ON articles(deleted_at, status, updated_at DESC);
CREATE INDEX idx_tags_slug_nocase ON tags(slug COLLATE NOCASE);
CREATE INDEX idx_article_relations_article ON article_relations(article_id, sort_order);
