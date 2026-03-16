import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Duck Cloud',
  description: 'Learn about our privacy policy and how we handle your data',
};

export default function PrivacyPage() {
  return (
    <section className="py-20 px-4 bg-dark min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="section-title text-gradient mb-6">Privacy Policy</h1>
        <p className="section-subtitle mb-12">
          At Duck Cloud, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our services.
        </p>
        <div className="text-left space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
            <p className="text-gray-400">
              We may collect the following types of personal information from you:
            </p>
            <ul className="list-disc list-inside">
              <li>Name</li>
              <li>Email Address</li>
              <li>IP Address</li>
              <li>Usage Data</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">How We Use Your Information</h2>
            <p className="text-gray-400">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside">
              <li>Provide and improve our services</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Send you promotional content and updates</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Data Security</h2>
            <p className="text-gray-400">
              We implement appropriate security measures to protect your information from unauthorized access or disclosure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}