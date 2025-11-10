'use client';

import { motion } from 'framer-motion';

export const BlogList = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Introducing Duck Cloud: The Future of Developer Tools',
      excerpt:
        'We are excited to announce the launch of Duck Cloud, a comprehensive platform for developers.',
      date: '2025-11-10',
      author: 'Duck Cloud Team',
      category: 'Announcement',
      image: '📢',
    },
    {
      id: 2,
      title: 'TikTok Commenter v2.0: New Features Released',
      excerpt: 'Our most popular tool just got even better with advanced analytics and automation.',
      date: '2025-11-08',
      author: 'Product Team',
      category: 'Update',
      image: '🚀',
    },
    {
      id: 3,
      title: 'Best Practices for Social Media Automation',
      excerpt:
        'Learn how to efficiently automate your social media workflow without losing authenticity.',
      date: '2025-11-05',
      author: 'Developer',
      category: 'Tutorial',
      image: '📚',
    },
    {
      id: 4,
      title: 'API Documentation: Getting Started Guide',
      excerpt: 'Everything you need to know to integrate Duck Cloud APIs into your application.',
      date: '2025-11-01',
      author: 'Engineering Team',
      category: 'Guide',
      image: '🔧',
    },
  ];

  return (
    <section className="py-20 bg-dark px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="section-title text-gradient">Latest News & Updates</h1>
          <p className="section-subtitle">
            Stay updated with the latest announcements, features, and tutorials from Duck Cloud
          </p>
        </motion.div>

        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-dark hover:scale-102 cursor-pointer transition-transform"
            >
              <div className="flex gap-4">
                <div className="text-5xl flex-shrink-0">{post.image}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">By {post.author}</span>
                    <button className="text-primary font-bold hover:text-accent transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
