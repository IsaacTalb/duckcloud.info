'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/50">
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Welcome to Duck Cloud
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Bold Tools</span>
            <br />
            <span className="text-white">for Modern Developers</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover powerful tools and software designed for developers, creators, and enterprises.
            From social media automation to advanced analytics, we have everything you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary inline-flex items-center justify-center gap-2">
              Explore Products
              <FiArrowRight />
            </Link>
            <Link href="/tools">
              <button className="btn-secondary">Watch Demo</button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
        >
          <div>
            <div className="text-3xl font-bold text-primary">4+</div>
            <div className="text-gray-400 text-sm">Products</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">10K+</div>
            <div className="text-gray-400 text-sm">Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">99%</div>
            <div className="text-gray-400 text-sm">Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
