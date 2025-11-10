'use client';

import { motion } from 'framer-motion';
import { FiUsers, FiGithub, FiCode } from 'react-icons/fi';

export const Community = () => {
  return (
    <section className="py-20 bg-secondary relative overflow-hidden px-4">
      {/* Background */}
      <div className="absolute -left-40 top-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-gradient">Join Our Community</h2>
          <p className="section-subtitle">
            Connect with developers, contribute to open source, and shape the future of Duck Cloud
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Community Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            viewport={{ once: true }}
            className="bg-dark/50 border border-gray-700 rounded-lg p-8 text-center hover:border-primary transition-all duration-300"
          >
            <div className="text-5xl mb-4 flex justify-center">
              <FiUsers className="text-primary" size={48} />
            </div>
            <h3 className="text-xl font-bold mb-3">Active Community</h3>
            <p className="text-gray-400 mb-6">
              Join thousands of developers using Duck Cloud tools and sharing their experiences
            </p>
            <button className="btn-secondary w-full">Join Discord</button>
          </motion.div>

          {/* Community Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-dark/50 border border-gray-700 rounded-lg p-8 text-center hover:border-primary transition-all duration-300"
          >
            <div className="text-5xl mb-4 flex justify-center">
              <FiGithub className="text-primary" size={48} />
            </div>
            <h3 className="text-xl font-bold mb-3">Open Source</h3>
            <p className="text-gray-400 mb-6">
              Contribute to our open-source projects and help shape the future of Duck Cloud
            </p>
            <button className="btn-secondary w-full">View on GitHub</button>
          </motion.div>

          {/* Community Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-dark/50 border border-gray-700 rounded-lg p-8 text-center hover:border-primary transition-all duration-300"
          >
            <div className="text-5xl mb-4 flex justify-center">
              <FiCode className="text-primary" size={48} />
            </div>
            <h3 className="text-xl font-bold mb-3">Developer Support</h3>
            <p className="text-gray-400 mb-6">
              Get help from our community and team with documentation, tutorials, and support
            </p>
            <button className="btn-secondary w-full">Read Docs</button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
