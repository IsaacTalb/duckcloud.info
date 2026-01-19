import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Duck Cloud',
  description: 'Get in touch with Duck Cloud for support, inquiries, or feedback',
};

export default function ContactPage() {
  return (
    <section className="py-20 px-4 bg-dark min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="section-title text-gradient mb-6">Contact Duck Cloud</h1>
        <p className="section-subtitle mb-12">
          We&apos;d love to hear from you! Whether you have questions, need support, or want to provide feedback, our team is here to help. Reach out to us through any of the following methods:
        </p>
        <div className="space-y-8 text-left">
          <div>
            <h2 className="text-2xl font-bold mb-2">Email Us</h2>
            <p className="text-gray-400">
              For general inquiries and support, email us at{' '}
              <a href="mailto:admin@duckcloud.info" className="text-primary hover:underline">admin@duckcloud.info</a>.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Visit Our Website</h2>
            <p className="text-gray-400">
              We&apos;re also available on our website at{' '}
              <a href="https://www.duckcloud.info" className="text-primary hover:underline">https://www.duckcloud.info</a>.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Follow Us on Social Media</h2>
            <p className="text-gray-400">
              Stay connected with us on{' '}
              <a href="https://github.com/Duck-Cloud-Info" className="text-primary hover:underline">Twitter</a> and{' '}
              <a href="https://github.com/Duck-Cloud-Info" className="text-primary hover:underline">GitHub</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}