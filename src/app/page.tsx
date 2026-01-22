'use client';

import { Hero } from '@/components/sections/Hero';
import { Products } from '@/components/sections/Products';
import { Features } from '@/components/sections/Features';
import { Tools } from '@/components/sections/Tools';
import { Community } from '@/components/sections/Community';
import { CTA } from '@/components/sections/CTA';
import { DisplayAd } from '@/components/ads';
import { BlogList, blogPosts } from '../components/sections/BlogList';

export default function HomePage() {
  // Get the 3 most recent posts
  const recentPosts = blogPosts.slice(-3).reverse();

  return (
    <>
      <Hero />
      <Products />
      <Features />
      <DisplayAd />
      <Tools />
      <BlogList blogPosts={recentPosts} />
      <Community />
      <CTA />
    </>
  );
}

