CREATE TABLE page_view_daily (
  day TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('blog', 'tool')),
  identifier TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0 CHECK (views >= 0),
  PRIMARY KEY (day, kind, identifier)
);

CREATE INDEX idx_page_view_daily_kind_views
  ON page_view_daily(kind, views DESC);
