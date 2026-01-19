import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Duck Cloud',
  description: 'Learn more about Duck Cloud, our mission, and our team',
};

export default function AboutPage() {
  return (
    <section className="py-20 px-4 bg-dark min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="section-title text-gradient mb-6">About Duck Cloud</h1>
        <p className="section-subtitle mb-12">
          At Duck Cloud, we&apos;re on a mission to make the world a better place by providing powerful tools and services for developers, creators, and enterprises. Our team is made up of experienced professionals who share a common passion for innovation and a commitment to excellence.
        </p>
        <p className="section-subtitle mb-12">
            Founded in 2020, Duck Cloud has quickly grown into a trusted name in the tech community. We believe in the power of open source and community-driven development, which is why many of our projects are available on GitHub for anyone to explore and contribute to.
        </p>
        <p className="section-subtitle mb-12">
          Our commitment to open source and community-driven development is at the heart of everything we do. We believe in transparency, collaboration, and empowering developers with the tools they need to build amazing things.
        </p>
      </div>
    </section>
  );
}
