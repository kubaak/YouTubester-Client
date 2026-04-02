import { Scale, AlertTriangle, Shield } from 'lucide-react';

export default function TermsOfServicePage() {
  const lastUpdated = 'April 1, 2026';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-moderate">
          <Scale className="w-8 h-8 text-primary-foreground" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">These terms govern your use of Tubester.</p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Identity */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">Operator</h2>
        <p className="text-muted-foreground">
          Tubester is operated by <strong>99 Soft LLC</strong>, a company registered in Wyoming, USA.
        </p>
      </section>

      {/* Acceptance */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">Acceptance</h2>
        <p className="text-muted-foreground">
          By using Tubester, you agree to these Terms. If you do not agree, do not use the service.
        </p>
      </section>

      {/* Service description */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">Service Description</h2>
        <p className="text-muted-foreground">
          Tubester provides tools to generate, review, and submit YouTube video metadata using AI assistance.
        </p>

        <ul className="list-disc ml-6 text-muted-foreground mt-4">
          <li>AI-generated suggestions</li>
          <li>Draft editing and review</li>
          <li>Submission of metadata to YouTube (upon user action)</li>
        </ul>

        <p className="text-muted-foreground mt-4">Features may change at any time without notice.</p>
      </section>

      {/* User responsibility */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">User Responsibilities</h2>

        <ul className="list-disc ml-6 text-muted-foreground">
          <li>You are responsible for all content generated or submitted using the service</li>
          <li>You must comply with YouTube’s terms and applicable laws</li>
          <li>You must not misuse or abuse the platform</li>
        </ul>
      </section>

      {/* AI disclaimer */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">AI-Generated Content</h2>

        <p className="text-muted-foreground">
          Tubester provides AI-generated suggestions. These outputs may be inaccurate, incomplete, or inappropriate.
        </p>

        <p className="text-muted-foreground mt-4">
          You are solely responsible for reviewing and approving any content before submitting it to YouTube.
        </p>
      </section>

      {/* Prohibited use */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">Prohibited Use</h2>

        <ul className="list-disc ml-6 text-muted-foreground">
          <li>Spam, harassment, or abusive content</li>
          <li>Illegal activities</li>
          <li>Attempting to bypass system limits or security</li>
        </ul>

        <p className="text-muted-foreground mt-4">We may suspend or terminate your access at any time.</p>
      </section>

      {/* Liability */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          <h2 className="text-xl font-bold">Limitation of Liability</h2>
        </div>

        <p className="text-muted-foreground">The service is provided "as is" without warranties of any kind.</p>

        <p className="text-muted-foreground mt-4">
          To the maximum extent permitted by law, 99 Soft LLC shall not be liable for any indirect, incidental,
          consequential, or special damages, including loss of data, revenue, or business opportunities.
        </p>
      </section>

      {/* Indemnification */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">Indemnification</h2>

        <p className="text-muted-foreground">
          You agree to indemnify and hold harmless 99 Soft LLC from any claims, damages, or losses arising from your use
          of the service or violation of these Terms.
        </p>
      </section>

      {/* Termination */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">Termination</h2>

        <p className="text-muted-foreground">
          We may suspend or terminate your access at any time, with or without notice.
        </p>
      </section>

      {/* Governing law */}
      <section className="glass rounded-xl p-8 border border-border/50">
        <h2 className="text-xl font-bold mb-4">Governing Law</h2>

        <p className="text-muted-foreground">These Terms are governed by the laws of the State of Wyoming, USA.</p>
      </section>

      {/* Contact */}
      <section className="glass rounded-xl p-8 border border-border/50 text-center">
        <h2 className="text-xl font-bold mb-4">Contact</h2>
        <p className="text-muted-foreground">info@tubester.app</p>
      </section>

      {/* Final note */}
      <div className="text-sm text-muted-foreground text-center">By using Tubester, you agree to these Terms.</div>
    </div>
  );
}
