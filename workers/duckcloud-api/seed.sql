-- Development only: wrangler d1 execute duckcloud --local --file=seed.sql
INSERT OR IGNORE INTO article_categories VALUES
('cat-developer','developer','Developer','Software development',10,datetime('now'),datetime('now')),
('cat-linux','linux','Linux','Linux guides',20,datetime('now'),datetime('now')),
('cat-networking','networking','Networking','Networks and protocols',30,datetime('now'),datetime('now')),
('cat-cybersecurity','cybersecurity','Cybersecurity','Defensive security',40,datetime('now'),datetime('now')),
('cat-ai','ai','AI','Practical artificial intelligence',50,datetime('now'),datetime('now')),
('cat-tutorials','tutorials','Tutorials','Step-by-step guides',60,datetime('now'),datetime('now'));
INSERT OR IGNORE INTO articles (id,slug,title,excerpt,content,status,author_name,published_at,created_at,updated_at) VALUES
('dev-welcome','cms-development-welcome','CMS development welcome','A local-only example article.','# CMS development welcome\n\nThis record is safe development seed content.','draft','Duck Cloud Team',NULL,datetime('now'),datetime('now'));
