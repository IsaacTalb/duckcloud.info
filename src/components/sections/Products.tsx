'use client';

import { motion } from 'framer-motion';
import { products } from '@/utils/data';
import Link from 'next/link';

export const Products = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-dark relative overflow-hidden px-4">
      {/* Background elements */}
      <div className="absolute -right-40 -top-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-gradient">Featured Products</h2>
          <p className="section-subtitle">
            Powerful tools and software designed for developers, creators, and enterprises
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="card-dark group cursor-pointer"
            >
              <div className="text-4xl mb-4">{product.icon}</div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{product.description}</p>

              <div className="flex items-center justify-between mt-6">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    product.status === 'active'
                      ? 'bg-success/20 text-success'
                      : product.status === 'beta'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
                <Link
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:text-accent transition-colors"
                >
                  Visit →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link href="/products" className="btn-primary inline-flex items-center gap-2">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
};
