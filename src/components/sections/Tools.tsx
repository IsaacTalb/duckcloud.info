'use client';

import { motion } from 'framer-motion';
import { tools } from '@/utils/data';

export const Tools = () => {
  const popularTools = tools.filter((tool) => tool.isPopular);
  const otherTools = tools.filter((tool) => !tool.isPopular);

  return (
    <section className="py-20 bg-dark relative overflow-hidden px-4">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-gradient">Developer Tools</h2>
          <p className="section-subtitle">
            Powerful utilities to accelerate your development workflow
          </p>
        </motion.div>

        {/* Popular Tools */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-primary">⭐ Popular Tools</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {popularTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-dark bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h4 className="text-lg font-bold mb-2">{tool.name}</h4>
                <p className="text-gray-400 text-sm">{tool.description}</p>
                <div className="mt-4 inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                  {tool.category}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Other Tools */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-gray-300">More Tools</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {otherTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-dark hover:bg-secondary/80"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h4 className="text-lg font-bold mb-2">{tool.name}</h4>
                <p className="text-gray-400 text-sm">{tool.description}</p>
                <div className="mt-4 inline-block px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-xs font-bold">
                  {tool.category}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
