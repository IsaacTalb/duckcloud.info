import type { Metadata } from 'next';
import { InArticleAd, MultiplexAd } from '@/components/ads';
export const metadata: Metadata = {
  title: "Introducing Duck Cloud - Duck Cloud",
  description: "We are excited to announce the launch of Duck Cloud, a comprehensive platform for developers.",
};

export default function BlogPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-20">
      <article className="prose prose-xl text-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-gradient">Introducing Duck Cloud: The Future of Developer Tools</h1>
        <div className="flex items-center mb-6">
          <span className="bg-yellow-400 text-black px-4 py-1 rounded-md">2025-11-10</span>
          <span className="mx-2">|</span>
          <span className="bg-white border border-yellow-400 text-black px-4 py-1 rounded-md">Duck Cloud Team</span>
          <span className="mx-2">|</span>
          <span className="bg-white border border-green-600 text-green-800 px-4 py-1 rounded-md">Announcement</span>
        </div>

        <section className="space-y-6 mb-12">
          <p className="text-lg text-gray-400">
            At Duck Cloud, we believe that developers and creators should have access to the best tools and software to build amazing things. That's why we are excited to announce the launch of our platform, which offers a wide range of innovative tools and software to help you achieve your goals. From code generation to AI-powered analytics, we have you covered.
          </p>
          <p className="text-lg text-gray-400">
            Our mission is to empower developers and creators to build amazing things, and we are committed to delivering the best possible experience for our users. We are always looking for ways to improve and expand our platform, and we would love to hear from you on how we can do better.
          </p>
          <p className="text-lg text-gray-400">
            Whether you are a seasoned developer or just starting out, we have something for everyone. Our platform is designed to be user-friendly and accessible, so you can focus on what matters most—building amazing things.
          </p>
        </section>

        <InArticleAd />

        ### Key Features
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-gradient">AI Code Generation</h3>
            <p className="text-gray-400 mb-4">Generate production-ready code in seconds with our advanced AI models. Supports React, Node.js, Python, and more—tailored to your specs.</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Natural language prompts</li>
              <li>• Auto-debugging</li>
              <li>• Framework integration</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-gradient">Real-Time Analytics</h3>
            <p className="text-gray-400 mb-4">Track performance, user behavior, and code efficiency with AI-driven insights. No setup required—plug and play.</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Live dashboards</li>
              <li>• Predictive trends</li>
              <li>• Anomaly detection</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-gradient">Collaborative IDE</h3>
            <p className="text-gray-400 mb-4">Seamless multiplayer editing with version control baked in. Perfect for teams or solo creators.</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Instant sharing</li>
              <li>• Conflict resolution</li>
              <li>• GitHub sync</li>
            </ul>
          </div>
        </section>

        ### Why Choose Duck Cloud?
        <section className="bg-gray-900/30 p-8 rounded-2xl border border-gray-700 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gradient">Built for Speed, Scale, and Simplicity</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-300 mb-6">We've stripped away the complexity. Deploy in minutes, scale effortlessly, and iterate faster than ever. Our serverless architecture handles the heavy lifting so you can ship features, not servers.</p>
              <blockquote className="text-gray-400 italic border-l-4 border-yellow-400 pl-6 py-4">
                "Duck Cloud turned my weekend hack into a full app in hours. Game-changer."
                <br />
                <span className="text-yellow-400 font-semibold">- Sarah K., Indie Dev</span>
              </blockquote>
            </div>
            <div>
              <p className="text-lg text-gray-300 mb-6">Free tier for starters, enterprise plans for pros. No vendor lock-in, full API access, and 99.99% uptime guaranteed.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">Free Tier</span>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">Scalable Pricing</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">API-First</span>
              </div>
            </div>
          </div>
        </section>

        <MultiplexAd />

        ### What's Next: Our Roadmap
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold text-gradient">Join the Journey</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-6 rounded-xl">
              <h4 className="font-bold mb-2">Q4 2025</h4>
              <p className="text-gray-400">Beta launch + core tools live.</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl">
              <h4 className="font-bold mb-2">Q1 2026</h4>
              <p className="text-gray-400">Mobile app + advanced ML models.</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl">
              <h4 className="font-bold mb-2">Q2 2026</h4>
              <p className="text-gray-400">Enterprise features + global CDNs.</p>
            </div>
          </div>
        </section>

        <section className="text-center py-12 bg-gradient-to-r from-yellow-400/10 to-green-600/10 rounded-2xl border border-yellow-400/30">
          <h2 className="text-3xl font-bold mb-4 text-gradient">Ready to Build Amazing Things?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Sign up today and get started with our free tier. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#signup" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-8 rounded-xl text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">Get Started Free</a>
            <a href="#demo" className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl text-lg hover:bg-white hover:text-black transition-all">Watch Demo</a>
          </div>
        </section>

        <section className="text-sm text-gray-500 text-center">
          <p>Have feedback? <a href="#contact" className="text-yellow-400 hover:underline">Email us</a> or join our <a href="#discord" className="text-yellow-400 hover:underline">Discord community</a>.</p>
        </section>
      </article>
    </main>

  )
}
