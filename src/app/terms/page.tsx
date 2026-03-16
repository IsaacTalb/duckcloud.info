import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms - Duck Cloud',
  description: 'Read the terms and conditions for using Duck Cloud services',
};

export default function TermsPage() {
  return (
    <section className="py-20 px-4 bg-dark min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-title text-gradient mb-6 text-center">Terms and Conditions</h1>
        <p className="section-subtitle mb-12 text-center">
          By using Duck Cloud websites, tools, and resources, you agree to these terms.
        </p>

        <div className="card-dark space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">1. Acceptable Use</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Use our services in compliance with applicable laws and platform rules.</li>
              <li>
                Do not abuse, disrupt, or attempt unauthorized access to any Duck Cloud service.
              </li>
              <li>Respect API limits, platform restrictions, and fair-use boundaries.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">2. Content Responsibility</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                You are responsible for all content, scheduling, and publication actions performed
                through your account.
              </li>
              <li>
                You must have the rights to publish any media, text, and links posted via our tools.
              </li>
              <li>
                We may remove access to services for spam, abuse, impersonation, or harmful
                activity.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">3. Multi-Post Tool</h2>
            <p className="text-gray-300 mb-3">
              Multi-Post is a web-based content management tool that allows users to publish and
              manage their own content across multiple social media platforms from one interface.
            </p>
            <p className="text-gray-300">
              Official website:{' '}
              <Link
                href="https://postiz-fa6p.duckcloud.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors"
              >
                postiz-fa6p.duckcloud.info
              </Link>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">4. Service Availability</h2>
            <p className="text-gray-300">
              We continuously improve our services and may update, suspend, or retire features at
              any time. While we aim for high availability, uptime is not guaranteed.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">5. Limitation of Liability</h2>
            <p className="text-gray-300">
              Duck Cloud services are provided "as is". To the maximum extent permitted by law, we
              are not liable for indirect, incidental, or consequential damages arising from use of
              our services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
