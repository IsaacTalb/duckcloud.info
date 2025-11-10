'use client';

import { Hero } from '@/components/sections/Hero';
import { Products } from '@/components/sections/Products';
import { Features } from '@/components/sections/Features';
import { Tools } from '@/components/sections/Tools';
import { Community } from '@/components/sections/Community';
import { CTA } from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Features />
      <Tools />
      <Community />
      <CTA />
    </>
  );
}
