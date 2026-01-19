'use client';

import { motion } from 'framer-motion';
import { products } from '@/utils/data';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

export const ProductDetail = () => {
  return (
    <section className="py-20 bg-dark px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="section-title text-gradient">All Products</h1>
          <p className="section-subtitle">
            Explore our complete product ecosystem designed for developers and creators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-dark lg:col-span-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-6xl">{product.icon}</div>
                <span
                  className={`text-xs font-bold px-4 py-2 rounded-full ${
                    product.status === 'active'
                      ? 'bg-success/20 text-success'
                      : product.status === 'beta'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
              </div>

              <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
              <p className="text-gray-300 mb-4">{product.longDescription}</p>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-primary mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-400">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-secondary border border-gray-600 text-xs text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary"
              >
                Visit {product.name}
                <FiExternalLink />
              </Link>

              <Link 
                href={product.sourceurl}
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-4 inline-flex items-center gap-2 btn-secondary"
              >
                View on GitHub
                <FiExternalLink />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
