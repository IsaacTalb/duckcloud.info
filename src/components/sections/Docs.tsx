'use client';

import { motion } from 'framer-motion';

export const Docs = () => {
  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      items: [
        'Installation Guide',
        'Quick Start',
        'Configuration',
        'First Steps',
      ],
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      items: [
        'Authentication',
        'Endpoints',
        'Error Handling',
        'Rate Limiting',
      ],
    },
    {
      id: 'tutorials',
      title: 'Tutorials',
      items: [
        'Building Your First App',
        'Advanced Features',
        'Best Practices',
        'Troubleshooting',
      ],
    },
    {
      id: 'sdks',
      title: 'SDKs & Libraries',
      items: [
        'JavaScript/TypeScript',
        'Python',
        'Node.js',
        'Go',
      ],
    },
  ];

  return (
    <section className="py-20 bg-dark px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="section-title text-gradient">Documentation</h1>
          <p className="section-subtitle">
            Everything you need to build amazing applications with Duck Cloud
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-dark"
            >
              <h2 className="text-2xl font-bold mb-6 text-primary">{section.title}</h2>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item}>
                    <button className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors w-full text-left">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {item}
                      <span className="ml-auto text-gray-600">→</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-secondary rounded-lg border border-gray-700 p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-primary">📚 Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold mb-2">Community Forum</h4>
              <p className="text-gray-400 text-sm mb-4">
                Ask questions and get answers from our community
              </p>
              <button className="btn-secondary w-full text-sm">Visit Forum</button>
            </div>
            <div>
              <h4 className="font-bold mb-2">API Reference</h4>
              <p className="text-gray-400 text-sm mb-4">
                Complete API documentation and examples
              </p>
              <button className="btn-secondary w-full text-sm">View API Docs</button>
            </div>
            <div>
              <h4 className="font-bold mb-2">Support</h4>
              <p className="text-gray-400 text-sm mb-4">
                Get help from our support team
              </p>
              <button className="btn-secondary w-full text-sm">Contact Support</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
