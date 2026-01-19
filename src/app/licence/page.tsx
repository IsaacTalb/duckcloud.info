import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Licence - Duck Cloud',
  description: 'Read the licence information for Duck Cloud services',
};

export default function LicencePage() {
  return (
    <section className="py-20 px-4 bg-dark min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="section-title text-gradient mb-6">Licence Information</h1>
        <p className="section-subtitle mb-12">
          The Duck Cloud services and software are licensed under the MIT License. This means you are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the following conditions:
        </p>
        <ol className="list-decimal list-inside text-left space-y-4">
          <li>
            You must include the original copyright notice and this permission notice in all copies or substantial portions of the software.
          </li>
          <li>
            You may not sell or distribute the software without prior written permission from the Duck Cloud team.
          </li>
          <li>
            If you modify the software, you must also distribute the modified version under the same license.
          </li>
        </ol>
      </div>
    </section>
  );
}