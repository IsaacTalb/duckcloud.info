import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Duck Cloud',
  description: 'Privacy policy for the Duck Cloud app, including Multi-Post and TikTok integrations',
};

export default function PrivacyPage() {
  return (
    <section className="py-20 px-4 bg-dark min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="section-title text-gradient mb-6">Privacy Policy</h1>
        <p className="section-subtitle mb-12">
          This Privacy Policy applies to the <strong>Duck Cloud app</strong> and its <strong>Multi-Post</strong> feature.
          Multi-Post is a web-based content management tool that allows users to create, publish, and manage
          their own content across multiple social media platforms from one interface.
        </p>

        <div className="text-left space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">TikTok Login and Account Access</h2>
            <p className="text-gray-400">
              Users sign in using TikTok Login Kit and authorize their own TikTok account to connect with
              Multi-Post. After authentication, we request only the scopes needed for account connection and
              dashboard features.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <strong>user.info.basic</strong> and <strong>user.info.profile</strong>: used to confirm the
                connected TikTok account and display basic profile information.
              </li>
              <li>
                <strong>user.info.stats</strong>: used to display basic account statistics in the user dashboard.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Content Posting and Video Management</h2>
            <p className="text-gray-400">
              Multi-Post lets users upload and publish their own videos directly to their own TikTok accounts
              through the TikTok Content Posting API.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <strong>video.upload</strong>: used to upload video files selected by the user.
              </li>
              <li>
                <strong>video.publish</strong>: used to publish user-uploaded videos to the user&apos;s TikTok account.
              </li>
              <li>
                <strong>video.list</strong>: used to retrieve previously published videos so users can view and
                manage their own TikTok content in the dashboard.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">How We Use Your Information</h2>
            <p className="text-gray-400">We use collected information only to operate and improve the app, including to:</p>
            <ul className="list-disc list-inside">
              <li>Provide account access and support requested features.</li>
              <li>Operate, secure, and improve the Duck Cloud and Multi-Post experience.</li>
              <li>Allow users to publish and manage only their own content.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Data Ownership and Account Authorization</h2>
            <p className="text-gray-400">
              Each user must authorize their own TikTok account. The application only allows users to manage and
              publish their own content, and does not provide tools to access or publish content for other users
              without authorization.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Data Security</h2>
            <p className="text-gray-400">
              We implement reasonable technical and organizational safeguards to protect information from
              unauthorized access, disclosure, or misuse.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
