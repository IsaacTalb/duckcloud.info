import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms - Duck Cloud',
  description: 'Read the terms and conditions for using Duck Cloud services',
};

export default function TermsPage() {
  return (
    <section className="py-20 px-4 bg-dark min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="section-title text-gradient mb-6">Terms and Conditions</h1>
        <p className="section-subtitle mb-12">
          By using our services, you agree to the following terms and conditions:
        </p>
        <ol className="list-decimal list-inside">
          <li>
            You may use our services for personal or non-commercial purposes.
          </li>
          <li>
            You may not use our services for any illegal or unauthorized
            activities.
          </li>
          <li>
            You agree to indemnify and hold us harmless from any claims, damages,
            or liabilities resulting from your use of our services.
          </li>
        </ol>
      </div>
    </section>
  );
}
