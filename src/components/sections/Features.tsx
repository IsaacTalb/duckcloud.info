'use client';

import { motion } from 'framer-motion';
import { features } from '@/utils/data';

export const Features = () => {
  return (
    <section className="py-20 bg-secondary relative overflow-hidden px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute -left-40 -top-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-40 bottom-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-gradient">Why Choose Duck Cloud?</h2>
          <p className="section-subtitle">
            Built for performance, security, and developer experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark/50 backdrop-blur border border-gray-700 rounded-lg p-8 hover:border-primary transition-all duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
