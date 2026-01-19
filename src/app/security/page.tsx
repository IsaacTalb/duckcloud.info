import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security - Duck Cloud',
  description: 'Learn about the security measures and practices implemented by Duck Cloud',
};

export default function SecurityPage() {
  return (
    <section className="py-20 px-4 bg-dark min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="section-title text-gradient mb-6">Security at Duck Cloud</h1>
        <p className="section-subtitle mb-12">
          At Duck Cloud, we take security seriously and implement a range of measures to protect your data and ensure the safety of our services. Our security measures include:
        </p>
        <ul className="list-disc list-inside">
          <li>Strong encryption for sensitive data</li>
          <li>Regular security audits and updates</li>
          <li>Regular backups and disaster recovery plans</li>
        </ul>
      </div>
    </section>
  );
}