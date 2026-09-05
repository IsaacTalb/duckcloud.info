'use client';

import { use, type ReactNode } from 'react';
import { AnalyticsView } from '@/components/admin/AnalyticsView';
import {
  ArticleEditorView,
  ArticlesView,
  CategoriesView,
  DashboardView,
  ImportExportView,
  MediaView,
  SettingsView,
  TagsView,
  ToolsView,
  UnknownView,
} from '@/components/admin/AdminViews';

export default function AdminPage({ params }: { params: Promise<{ section?: string[] }> }) {
  const parts = use(params).section || [];
  const section = parts[0] || 'dashboard';
  const id = parts[1];
  const views: Record<string, ReactNode> = {
    dashboard: <DashboardView />,
    articles: id ? <ArticleEditorView id={id} /> : <ArticlesView />,
    categories: <CategoriesView />,
    tags: <TagsView />,
    analytics: <AnalyticsView />,
    media: <MediaView />,
    tools: <ToolsView />,
    settings: <SettingsView />,
    import: <ImportExportView />,
  };
  return views[section] || <UnknownView section={section} />;
}
