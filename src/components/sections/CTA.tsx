'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export const CTA = () => {
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg text-dark/80 mb-8 max-w-2xl mx-auto">
            Join thousands of developers using Duck Cloud tools to build faster, deploy easier, and
            scale further.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-dark text-primary font-bold rounded-lg hover:bg-black transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              Start Free Trial
              <FiArrowRight />
            </button>
            <Link
              href="#"
              className="px-8 py-4 bg-dark/20 text-dark font-bold rounded-lg hover:bg-dark/30 transition-all duration-300 border-2 border-dark"
            >
              Schedule Demo
            </Link>
          </div>

          <p className="text-sm text-dark/70 mt-8">
            No credit card required. 14-day free trial. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
